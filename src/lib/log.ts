
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

    public info(message: string) {
        return this.logger.info(message);
    }

    public error(message: string) {
        return this.logger.error(message);
    }

    public debug(message: string) {
        return this.logger.debug(message);
    }

    public warn(message: string) {
        return this.logger.warn(message);
    }

    public get_logger(): Logger {
        return this.logger;
    }
}