import * as dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT_DB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "social",
});

db.connect((err) => {
  if (err) return console.log(err.message);
  console.log("Connected to MySQL database!");
});

export default db;
