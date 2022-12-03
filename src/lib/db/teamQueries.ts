export class TeamQueries {

    constructor() { }

    public getAllTeams(): [string, any[]] {
        const sql: string = `
            SELECT *
            FROM nfl.team;
        `;

        let params: any[] = [];

        return [sql, params];
    }

}