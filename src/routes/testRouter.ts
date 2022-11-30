import { Request, Response, Router } from "express";
import { QueryResult } from "pg";

import { Log } from "../lib/log";
import { Database } from "../lib/db/index";

export class TestRouter {
    router: Router = Router();

     constructor(
        private logger: Log,
        private database: Database
     ) {
        // get /test/
        this.router.get("/", async (req: Request, res: Response): Promise<any> => {
            // Log request body or anything if you want
            this.logger.info(`Request body: ${req.body}`);
            // Query database and wait for results
            const result: QueryResult<any> = await this.database.query(
                `SELECT * FROM table;`, []
            );
            // Send the response with query results
            res.send(result.rows);
        });

        // get /test/id
        this.router.get("/:id", async (req: Request, res: Response): Promise<any> => {
            // Log request body or anything if you want
            this.logger.info(`Request body: ${req.body}`);
            // Query database and wait for results
            const result: QueryResult<any> = await this.database.query(
                `SELECT * FROM table WHERE attribute = $1;`, [req.params.id]
            );
            // Send the response with query results
            res.send(result.rows);
        });
    }

    get_router() {
        return this.router;
    }
}