import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response, json, urlencoded } from "express";
import helmet from "helmet";
import { Server } from "http";
import { AddressInfo } from "net";
import { Logger } from "winston";
import { ErrorHandler } from "../../../../lib/error-handling";
import { Routes } from "../routes";

export class AppServer {
    private connection!: Server;

    constructor(
        private log: Logger,
        private errorHandler: ErrorHandler
    ) {}

    public async startWebServer(): Promise<AddressInfo> {
        const app: Application = express();
        
        app.use(cors());
        app.use(helmet());
        app.use(urlencoded({ extended: true }));
        app.use(json());
        app.use(compression());

        // Attach routes
        app.use(new Routes(this.log).router);
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
            this.log.error(`Error on ${req.method} request to : ${req.url}`);
            await this.errorHandler.handleError(error, res);
            next();
        });
    }

    private async listenForRequests(app: Application): Promise<AddressInfo> {
        const port: number = 8081; // In live applications, use some sort of environment config
        this.connection = app.listen(port, async () => {
            this.log.info(`${new Date().toISOString()}: App listening on port: ${port}`);
            await this.errorHandler.listenToErrorEvents(this.connection);
        });
        return this.connection.address() as AddressInfo;
    }
}