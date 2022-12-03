import { Database } from "./db";
import { Log } from "./log";

export class Reporter {
    constructor(
        private log: Log,
        private datbase: Database
    ) {

    }
}