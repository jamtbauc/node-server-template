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

}