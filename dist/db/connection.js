"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = process.env.DATABASE || 'prototipo';
const username = process.env.USER || 'charly';
const password = process.env.PASSWORD || 'Ezequielpitufo1';
const host = process.env.PG_CONNECTION_STRING || 'charly.postgres.database.azure.com';
const db = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: host,
    port: 5432,
    database: database,
    username: username,
    password: password,
    dialectOptions: {
        ssl: true
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map