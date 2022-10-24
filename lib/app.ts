import { Application, Request, Response, NextFunction } from "express";
import compression from "compression";
import { Log } from "../lib/log";
import { Routes } from "../routes/index";

export class App {
    private PORT: number = 3000;

    constructor(
        private app: Application
    ) {
        let logger: Log  = new Log();
        let routes: Routes = new Routes();

        this.app.use(compression);

        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            logger.info(`Hit on ${req.url}`);
            next();
        });

        this.app.get('/', (req:Request, res:Response): void => {
            res.send("Hello, World!");
        });

        this.app.use(routes.get_router());

        this.app.listen(this.PORT, (): void => {
            logger.info(`App is running and listening on port: ${this.PORT}`);
        });
    }
}