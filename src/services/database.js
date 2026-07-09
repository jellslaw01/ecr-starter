const mysql = require("mysql2");

class Database {
    #hypercallDb = null;
    constructor() {
        this.#hypercallDb = mysql.createPool({
            host: process.env.DB_URL,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    hypercallDb = (query, data = null) => {
        return new Promise((resolve, reject) => {
            if (data === null) {
                this.#hypercallDb.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            } else {
                this.#hypercallDb.query(query, data, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            }
        });
    };
}
let database = new Database();
module.exports = database;
