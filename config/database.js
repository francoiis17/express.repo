import mysql from "mysql2/promise";
import { config } from "dotenv";

config();
const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

export const getConnection = () => {
  return connection;
};
