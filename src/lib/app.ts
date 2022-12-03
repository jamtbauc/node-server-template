import { Application, Request, Response, NextFunction, json } from "express";
import compression from "compression";
import { Log } from "./log";
import { Routes } from "../routes/index";
import { Database } from "./db";
import { Reporter } from "./reporter";

export class App {
    private PORT: number = 3000;
    private log: Log;
    private database: Database;
    private reporter: Reporter

    constructor(
        private app: Application
    ) {
        // Create new logger object
        this.log = new Log();
        // Create new database object
        this.database = new Database(this.log);
        // Create reporter object
        this.reporter = new Reporter(
            this.log,
            this.database
        );
        // Create routes object with all defined routes in routes/index.ts
        let routes: Routes = new Routes(
            this.log,
            this.database,
            this.reporter
        );
        // Tell app to use compression
        this.app.use(compression());
        // Tell app to use JSON body parser
        this.app.use(json());
        // Tell app to use middleware on every request: Log url hit
        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            if (req.originalUrl.includes('favicon.ico')) {
                res.status(204).end()
            } else {
                this.log.info(`Hit on ${req.url}`);
            }
            next();
        });
        // Attach all routes from route object
        this.app.use(routes.get_router());
        // Tell server to listen for requests
        this.app.listen(this.PORT, (): void => {
            this.log.info(`App is running and listening on port: ${this.PORT}`);
        });
    }
}