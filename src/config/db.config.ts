import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

console.log(process.env.db_username);

const sequelize = new Sequelize(
  process.env.db_name as string,
  process.env.db_username as string,
  process.env.password as string,
  {
    host: process.env.host,
    dialect: "postgres",
    logging: false,
  }
);

export { sequelize };
