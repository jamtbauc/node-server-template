import { QueryResult } from "pg";

import { ITeam } from "../shared/interfaces/team";

import { Database } from "./db";
import { TeamQueries } from "./db/teamQueries";

import { Log } from "./log";

export class Reporter {
    private teamQueries: TeamQueries = new TeamQueries();

    constructor(
        private log: Log,
        private database: Database
    ) {
        this.start();
    }

    private async start(): Promise<void> {
        const res = await this.database.query(
            this.teamQueries.getAllTeams()
        );

        let teams: ITeam[] = res.rows;

        for (let t of teams) {
            this.log.info(t.name);
        }
    }
}