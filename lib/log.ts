
import { createLogger, format, Logger, transports } from "winston";

export class Log {
    logger: Logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console({
                    format: format.simple()
                })
            ]
        });
    }

    info(message: string) {
        return this.logger.info(message);
    }

    get_logger(): Logger {
        return this.logger;
    }
}