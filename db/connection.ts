import { Sequelize } from 'sequelize';

const database = process.env.DATABASE || 'prototipo'; 
const username = process.env.USER || 'charly';
const password = process.env.PASSWORD || 'Ezequielpitufo1';
const host = process.env.PG_CONNECTION_STRING || 'charly.postgres.database.azure.com';

const db = new Sequelize({
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

export default db;