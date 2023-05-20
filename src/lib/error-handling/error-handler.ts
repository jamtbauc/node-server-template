import { Server } from "http";
import { LogService } from "../logging/log.service";
import { AppError } from "./app-error";
import { Response } from "express";

export class ErrorHandler {

    private serverRef!: Server;

    constructor(
        private log: LogService
    ) {}

    public async listenToErrorEvents(server: Server): Promise<void> {
        this.serverRef = server;

        process.on('uncaughtException', async (err: Error, origin: string) => {
            await this.log.error(`Uncaught exception at: ${origin} -> ${err}`);
            await this.handleError(err);
        });

        process.on('unhandledRejection', async (reason: Error | any, promise: Promise<any>) => {
            await this.log.error(`Unhandled rejection at: ${promise} -> ${reason}`);
            throw reason;
        });

        process.on('SIGTERM', async () => {
            await this.log.error(`App received SIGTERM event, attempting to gracefully close the server`);
            await this.termServerAndExit();
        });

        process.on('SIGINT', async () => {
            await this.log.error(`App received SIGINT event, attempting to gracefully close the server`);
            await this.termServerAndExit();
        });
    }

    public async handleError(errorToHandle: unknown, responseStream?: Response): Promise<void> {
        try {
            const appError: AppError = await this.normalizeError(errorToHandle);
            await this.log.error(appError.message);

            if (!appError.isOperational) {
                this.termServerAndExit();
            } else {
                // TODO: May have to add if statement here
                responseStream?.status(500).send();
            }
        } catch(handlingError: unknown) {
            process.stdout.write(
                'The error handler failed, here are the handler failure and then the origin error that it tried to handle:'
            );
            process.stdout.write(JSON.stringify(handlingError));
            process.stdout.write(JSON.stringify(errorToHandle));
        }
    }

    private async normalizeError(errorToHandle: unknown): Promise<AppError> {
        if (errorToHandle instanceof AppError) {
            return errorToHandle;
        }

        if (errorToHandle instanceof Error) {
            const appError: AppError = new AppError(
                errorToHandle.name,
                500,
                errorToHandle.message,
                true
            );
            return appError;
        }

        const errorType: any = typeof errorToHandle;
        return new AppError(
            'general-error',
            500,
            `ErrorHandler received an error with instance type: ${errorType}`,
            true
        );
    }

    private async termServerAndExit(): Promise<void> {
        await this.log.fatal(`Terminating server and exiting...`);
        if (this.serverRef) {
            this.serverRef.close();
        }
        process.exit();
    }
}