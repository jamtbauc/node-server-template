import { Request, Response, Router } from "express";
import { Database } from "../lib/db";
import { PlayerGameQueries } from "../lib/db/playerGameQueries";
import { Log } from "../lib/log";

export class PlayerGameRouter {
    private router: Router = Router();
    private playerGameQueries: PlayerGameQueries = new PlayerGameQueries();

     constructor(
        private log: Log,
        private database: Database
     ) {
        this.router.get("/", async (req: Request, res: Response) => {
            const result = await this.database.query(
                this.playerGameQueries.getAllPlayerGames()
            );
            res.send(result.rows);
        });
    }

    get_router() {
        return this.router;
    }
}