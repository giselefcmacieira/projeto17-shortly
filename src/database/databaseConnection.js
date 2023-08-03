import pg from "pg";
import dotenv, { config } from "dotenv";

dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL
};

if(process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);