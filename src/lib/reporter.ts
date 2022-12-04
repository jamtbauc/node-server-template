import { IMatchup } from "../shared/interfaces/matchup";

import { Database } from "./db";
import { GameQueries } from "./db/gameQueries";
import { TeamGameQueries } from "./db/teamGameQueries";

import { Log } from "./log";

export class Reporter {
    private gameQueries: GameQueries = new GameQueries();
    private teamGameQueries: TeamGameQueries = new TeamGameQueries();

    constructor(
        private log: Log,
        private database: Database
    ) {
        this.start();
    }

    private async start(): Promise<void> {
        const g_res = await this.database.query(
            this.gameQueries.getAllGameMatchups()
        );

        let reportDict: {[key: string]: {[key: string]: number[]}} = {};

        let matchups: IMatchup[] = g_res.rows;
        let count: number = 3;

        for(let m of matchups) {
            if (!(m.game_id in reportDict)) {
                reportDict[m.game_id] = {};
            }

            if (!(m.away in reportDict[m.game_id])) {
                reportDict[m.game_id][m.away] = [];
            }

            const a_res = await this.database.query(
                this.teamGameQueries.getCountPrevGameStats(
                    m.away,
                    m.curr_date.toISOString(),
                    count
                )
            );

            let a_prevs: number[] = [];

            for (let r of a_res.rows) {
                a_prevs.push(parseInt(Object.values(r).toString()));
            }

            reportDict[m.game_id][m.away] = a_prevs;

            const h_res = await this.database.query(
                this.teamGameQueries.getCountPrevGameStats(
                    m.home,
                    m.curr_date.toISOString(),
                    count
                )
            );

            let h_prevs: number[] = [];

            for (let r of h_res.rows) {
                h_prevs.push(parseInt(Object.values(r).toString()));
            }

            reportDict[m.game_id][m.home] = h_prevs;
        }

        for (let key of Object.keys(reportDict)) {
            this.log.info(key);
            for (let tm of Object.keys(reportDict[key])) {
                this.log.info(`\t${tm}`);
                for (let yds of reportDict[key][tm]) {
                    this.log.info(`\t\t${yds}`);
                }
            }
        }
    }
}