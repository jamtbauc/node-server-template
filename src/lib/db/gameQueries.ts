export class GameQueries {

    constructor() { }

    public getAllGames(): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.game;
        `;

        let params: any[] = [];

        return [sql, params];
    }

    public getAllGameMatchups(): [string, any[]] {
        const sql = `
            SELECT DISTINCT
                tg.game_id,
                g.season as curr_season,
                g.week as curr_week,
                g.date as curr_date,
                (
                    SELECT team_id 
                    FROM nfl.team_game 
                    WHERE game_id = tg.game_id 
                    AND is_home = 'false'
                ) as away,
                (
                    SELECT team_id
                    FROM nfl.team_game
                    WHERE game_id = tg.game_id
                    AND is_home = 'true'
                ) as home
            FROM nfl.team_game tg
            LEFT JOIN nfl.game g ON g.id = tg.game_id
            WHERE g.week > 'Week 3';
        `;

        let params: any[] = [];

        return [sql, params];
    }
}