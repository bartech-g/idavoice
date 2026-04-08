import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/index"
import * as schema from "../db/schemas/index"

export const auth = betterAuth({
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/get-session") {
                if (!ctx.context.session) {
                    return ctx.json({
                        session: null,
                        user: null,
                    });
                }
                return ctx.json(ctx.context.session);
            }
        }),
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
});
