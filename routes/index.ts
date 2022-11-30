import { Router } from "express";
import { Log } from "../lib/log";
import { Database } from "../lib/db/index";
import { Test } from "../routes/test";

export class Routes {
    private router: Router = Router();
    private database: Database;

    constructor(private log: Log) {
        // Create database
        this.database = new Database(this.log);
        
        let test = new Test();

        this.router.use("/test/", test.get_router());
    }

    get_router() {
        return this.router;
    }
}