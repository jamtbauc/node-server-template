import { AddressInfo } from "net";
import { Logger } from "winston";
import { AppServer } from "./components/app/entry-points/api/app-server";
import { ErrorHandler } from "./lib/error-handling/error-handler";
import { LogService } from "./lib/logging";

export class Index {
    constructor() {
        const logService: LogService = new LogService();
        const errorHandler: ErrorHandler = new ErrorHandler(logService.log);
        this.start(logService.log, errorHandler);
    }

    private async start(
        log: Logger,
        errorHandler: ErrorHandler
    ): Promise<void> {
        const appServer: AppServer = new AppServer(log, errorHandler);

        try {
            const startResponses: [AddressInfo] = await Promise.all([
                appServer.startWebServer()
            ]);
            log.info(`The app has started successfully: ${startResponses}`);
        } catch (err: unknown) {
            await errorHandler.handleError(err);
        }
    }
}

new Index();