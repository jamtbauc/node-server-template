import { Application, Request, Response, NextFunction } from "express";
import compression from "compression";
import { Log } from "../lib/log";
import { Routes } from "../routes/index";

export class App {
    private PORT: number = 3000;
    private log: Log;

    constructor(
        private app: Application
    ) {
        this.log = new Log();
        let routes: Routes = new Routes(this.log);

        this.app.use(compression());

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