import { Database, Statement } from 'sqlite3';

export class Connection {
    private connection: Database;

    constructor(filename: string) {
        this.connection = new Database(filename, (error: Error | null) => {
            if (error !== null) {
                throw error;
            }
        });
    }

    public raw(query: string, params?: any[] | Object): Promise<any[]> {
        return new Promise((resolve: (rows: any[]) => void, reject: (reason: Error) => void) => {
            this.connection.all(query, params, function (_: Statement, error: Error | null, rows: any[]) {
                if (error === null) {
                    resolve(rows);
                } else {
                    reject(error);
                }
            });
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
            this.connection.close((error: Error | null) => {
                if (error === null) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }
}
