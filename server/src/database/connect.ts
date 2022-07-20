import config from "config";
import { Client } from "pg";

const DATABASE_URL = process.env.DATABASE_URL || config.get("DATABASE_URL");

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export default client;
