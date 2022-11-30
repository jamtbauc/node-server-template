import { Router } from "express";
import { Log } from "../lib/log";
import { Database } from "../lib/db/index";

import { GameRouter } from "./gameRouter";

export class Routes {
    private router: Router = Router();
    private database: Database;

    constructor(private log: Log) {
        // Create database
        this.database = new Database(this.log);

        this.router.use("/games", new GameRouter(this.database).get_router());
    }

    get_router() {
        return this.router;
    }
}