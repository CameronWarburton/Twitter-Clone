import type { Config } from "drizzle-kit"

export default {
    schema: "./lib/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials:{
        url: process.env.DATABASE_CONNECTION_STRING as string
    }
} satisfies Config;