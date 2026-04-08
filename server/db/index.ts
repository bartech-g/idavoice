import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import env from '../../shared/schemas/env';

const sql = neon(env.DATABASE_URL!);
const db = drizzle(sql, { casing: "snake_case" });

export default db;