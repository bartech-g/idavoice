import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schemas';
import env from '../../lib/schemas/env';

const sql = neon(env.DATABASE_URL!);
const db = drizzle(sql, { schema, casing: "snake_case" });

export default db;
