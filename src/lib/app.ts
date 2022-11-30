import { Application, Request, Response, NextFunction, json } from "express";
import compression from "compression";
import { Log } from "../lib/log";
import { Routes } from "../routes";

export class App {
    private PORT: number = 3000;
    private logger: Log;

    constructor(
        private app: Application
    ) {
        // Create new logger object
        this.logger = new Log();
        // Create new routes object with all routes defined in routes/index.ts
        let routes: Routes = new Routes(this.logger);
        // Tell app to use compression
        this.app.use(compression());
        // Tell app to use json
        this.app.use(json());
        // Log hits on every route requested
        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            this.logger.info(`Hit on ${req.url}`);
            // Prevent favicon.ico request that node uses
            if (req.url.includes('favicon.ico')) {
                res.status(204).end()
            };
            next();
        });
        // Define root route, can delete if needed
        this.app.get('/', (req:Request, res:Response): void => {
            res.send("Hello, World!");
        });
        // Attach all routes to router
        this.app.use(routes.get_router());
        // Tell server to listen on port defined above
        this.app.listen(this.PORT, (): void => {
            this.logger.info(`App is running and listening on port: ${this.PORT}`);
        });
    }
}