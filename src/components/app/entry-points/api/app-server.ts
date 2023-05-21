import { AddressInfo } from "net";
import compression from "compression";
import express, { Application, NextFunction, Request, Response, json, urlencoded } from "express";
import helmet from "helmet";
import { Server } from "http";
import { ErrorHandler } from "../../../../lib/error-handling/error-handler";
import { LogService } from "../../../../lib/logging/log.service";
import { Routes } from "../routes";

export class AppServer {
    private connection!: Server;

    constructor(
        private log: LogService,
        private errorHandler: ErrorHandler
    ) {}

    public async startWebServer(): Promise<AddressInfo> {
        const app: Application = express();
        
        app.use(helmet());
        app.use(urlencoded({ extended: true }));
        app.use(json());
        app.use(compression());

        // Attach routes
        app.use(await new Routes(this.log).getRouter());
        // Attach middleware to send all errors to central error handler
        this.defineErrorHandlingMiddleware(app);

        const APIAddress: AddressInfo = await this.listenForRequests(app);
        return APIAddress;
    }

    private async defineErrorHandlingMiddleware(app: Application): Promise<void> {
        app.use(async (
            error: unknown,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            await this.log.error(`Error on ${req.method} request to : ${req.url}`);
            await this.errorHandler.handleError(error, res);
            next();
        });
    }

    private async listenForRequests(app: Application): Promise<AddressInfo> {
        const port: number = 8081; // In live applications, use some sort of environment config
        this.connection = app.listen(port, async () => {
            await this.log.info(`App listening on port: ${port}`);
            await this.errorHandler.listenToErrorEvents(this.connection);
        });
        return this.connection.address() as AddressInfo;
    }
}