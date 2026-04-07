import { integer, pgTable, text, } from "drizzle-orm/pg-core";


export const relatives = pgTable("relatives", {
    id: integer().primaryKey(),
    name: text().notNull(),
    key: text().notNull(),
    relation: text().notNull(),
    desciption: text(),
    createdAt: integer().notNull().$default(() => Date.now()),
    updatedAt: integer().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});