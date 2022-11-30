import { Router } from "express";
import { Log } from "../lib/log";
import { Database } from "../lib/db";

// Import all routers defined in src/routes/ here
import { TestRouter } from "./testRouter";

export class Routes {
    private router: Router = Router();
    private database: Database;

    constructor(
        private log: Log
    ) {
        // Create new database for all routes
        this.database = new Database(this.log);

        // Attach routes here
        // All routes that start with /test will route to this router
        this.router.use("/test", new TestRouter(this.log, this.database).get_router());
    }

    get_router() {
        return this.router;
    }
}