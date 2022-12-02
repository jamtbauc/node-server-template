import { Router } from "express";
import { Log } from "../lib/log";
import { Database } from "../lib/db/index";

import { GameRouter } from "./gameRouter";
import { PlayerGameRouter } from "./playerGameRouter";

export class Routes {
    private router: Router = Router();
    private database: Database;

    constructor(private log: Log) {
        // Create database
        this.database = new Database(this.log);

        this.router.use("/games", new GameRouter(this.log, this.database).get_router());
        this.router.use("/playergames", new PlayerGameRouter(this.log, this.database).get_router());
    }

    get_router() {
        return this.router;
    }
}