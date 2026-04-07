import * as z from "zod";

const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string()
});

export type EnvSchema = z.infer<typeof EnvSchema>;

export default EnvSchema.parse(process.env);