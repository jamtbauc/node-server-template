import { Request, Response, Router } from "express";
import { Database } from "../lib/db";
import { Log } from "../lib/log";

export class GameRouter {
    router: Router = Router();

     constructor(
        private log: Log,
        private database: Database
     ) {
        this.router.get("/", async (req: Request, res: Response) => {
            const result = await this.database.query(
                `SELECT * FROM nfl.game;`, []
            );
            res.send(result.rows);
        });
    }

    get_router() {
        return this.router;
    }
}