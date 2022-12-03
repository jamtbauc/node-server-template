import { Router } from "express";
import { Log } from "../lib/log";
import { Database } from "../lib/db/index";

import { GameRouter } from "./gameRouter";
import { PlayerGameRouter } from "./playerGameRouter";
import { Reporter } from "../lib/reporter";

export class Routes {
    private router: Router = Router();

    constructor(
        private log: Log,
        private database: Database,
        private reporter: Reporter
    ) {
        this.router.use("/games", new GameRouter(this.log, this.database).get_router());
        this.router.use("/playergames", new PlayerGameRouter(this.log, this.database).get_router());
    }

    get_router() {
        return this.router;
    }
}