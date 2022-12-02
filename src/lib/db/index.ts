import { Pool, QueryResult } from "pg";
import { Log } from "../log";

export class Database {
    private pool: Pool;
    constructor(
        private log: Log
    ) {
        this.pool = new Pool({
            host: 'localhost',
            user: 'jamtbauc',
            database: 'sports',
            password: 'postgres',
            port: 5432
        });
    }

    async query(text: string, params: string[]): Promise<QueryResult<any>> {
        const start: number = Date.now();
        const res: QueryResult<any> = await this.pool.query(text, params);
        const duration: number = Date.now() - start;
        this.log.info(`Executed query: ${text}\n\twith params: ${params}\n\ttook ${duration}ms\n\treturned ${res.rowCount} rows`);
        return res;
    }
}