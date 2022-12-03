import { Request, Response, Router } from "express";
import { Database } from "../lib/db";
import { Log } from "../lib/log";

import { GameQueries } from "../lib/db/gameQueries";

export class GameRouter {
    private router: Router = Router();
    private gameQueries: GameQueries = new GameQueries();

     constructor(
        private log: Log,
        private database: Database
     ) {
        this.router.get("/", async (req: Request, res: Response) => {
            const result = await this.database.query(
                this.gameQueries.getAllGames()
            );
            res.send(result.rows);
        });
    }

    get_router() {
        return this.router;
    }
}