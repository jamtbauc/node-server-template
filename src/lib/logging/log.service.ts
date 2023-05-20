import log4js, { Logger } from "log4js";
import config from "./log4js.json";

export class LogService {
    private log: Logger;

    constructor() {
        log4js.configure(config);
        this.log = log4js.getLogger();
    }

    public async trace(msg: String): Promise<void> {
        this.log.trace(msg);
    }

    public async debug(msg: String): Promise<void> {
        this.log.debug(msg);
    }

    public async info(msg: String): Promise<void> {
        this.log.info(msg);
    }

    public async warn(msg: String): Promise<void> {
        this.log.warn(msg);
    }

    public async error(msg: String): Promise<void> {
        this.log.error(msg);
    }

    public async fatal(msg: String): Promise<void> {
        this.log.fatal(msg);
    }
}