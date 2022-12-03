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

        let routes: Routes = new Routes(
            this.log,
            this.database,
            this.reporter
        );

        this.app.use(compression());

        this.app.use(json());

        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            this.log.info(`Hit on ${req.url}`);
            next();
        });

        this.app.use(routes.get_router());

        this.app.listen(this.PORT, (): void => {
            this.log.info(`App is running and listening on port: ${this.PORT}`);
        });
    }
}