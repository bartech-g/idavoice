import { integer, pgTable, text } from "drizzle-orm/pg-core";
export const testTable = pgTable("tests", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    test: text(),
    test2: text()
});