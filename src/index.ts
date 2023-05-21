import { AddressInfo } from "net";
import { AppServer } from "./components/app/entry-points/api/app-server";
import { ErrorHandler } from "./lib/error-handling/error-handler";
import { LogService } from "./lib/logging/log.service";

export class Index {
    constructor() {
        const logService: LogService = new LogService();
        const errorHandler: ErrorHandler = new ErrorHandler(logService);
        this.start(logService, errorHandler);
    }

    private async start(
        log: LogService,
        errorHandler: ErrorHandler
    ): Promise<void> {
        const appServer: AppServer = new AppServer(log, errorHandler);

        try {
            const startResponses: [AddressInfo] = await Promise.all([
                appServer.startWebServer()
            ]);
            await log.info(`The app has started successfully: ${startResponses}`);
        } catch (err: unknown) {
            await errorHandler.handleError(err);
        }
    }
}

new Index();