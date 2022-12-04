export class TeamGameQueries {

    constructor() { }

    public getTeamGames(): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.team_game;
        `;

        let params: any[] = [];

        return [sql, params];
    }

    public getTeamGamesByTeamId(id: string): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.team_game
            WHERE team_id = $1
        `;

        let params: any[] = [id];

        return [sql, params];
    }

    public getTeamGamesTeamIdByGameId(id: string): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.team_game
            WHERE game_id = $1
        `;

        let params: any[] = [id];

        return [sql, params];
    }

    public getCountPrevGameStats(
        team_id: string,
        date: string,
        count: number
    ): [string, any[]] {
        const sql = `
            SELECT
                tg.pass_yds
            FROM nfl.team_game tg
            LEFT JOIN nfl.game g on g.id = tg.game_id
            WHERE tg.team_id = $1
            AND g.date < $2
            ORDER BY g.date DESC
            LIMIT $3;
        `;

        let params: any[] = [
            team_id,
            date,
            count
        ];

        return [sql, params];
    }

}