import { integer, pgTable, text, } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const relatives = pgTable("relatives", {
    id: integer().primaryKey(),
    name: text().notNull(),
    key: text().notNull(),
    relation: text().notNull(),
    desciption: text(),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer().notNull().$default(() => Date.now()),
    updatedAt: integer().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});