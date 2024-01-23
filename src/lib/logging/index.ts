import { Logger, createLogger, format, transports } from "winston";

export class LogService {
    private _log!: Logger;

    constructor() {
        this._log = createLogger({
            level: 'info',
            format: format.simple(),
            transports: [
                new transports.Console()
            ]
        });
    }

    // Getter
    public get log(): Logger {
        if (this._log) {
            return this._log;
        } else {
            throw new Error(`Attempting to get undefined log from LogService!`);
        }
    }
}