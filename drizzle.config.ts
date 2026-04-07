import { defineConfig } from 'drizzle-kit';
import env from "./shared/schemas/env"

export default defineConfig({
    out: './server/db/migrations',
    schema: './server/db/schemas/index.ts',
    dialect: 'postgresql',
    casing: "snake_case",
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
});
