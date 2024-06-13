import Pool from "pg-pool";

export const pool = new Pool({
  database: "postgres",
  connectionString: process.env.DATBASE_CONNECTION_STRING,
  allowExitOnIdle: true,
});

