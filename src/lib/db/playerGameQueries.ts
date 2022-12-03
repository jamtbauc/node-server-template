export class PlayerGameQueries {

    constructor() { }

    public getAllPlayerGames(): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.player_game;
        `;

        let params: any[] = [];

        return [sql, params];
    }

}