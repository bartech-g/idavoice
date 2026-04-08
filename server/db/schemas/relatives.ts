import { bigint, integer, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const relatives = pgTable("relatives", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    key: text().notNull(),
    relation: text().notNull(),
    desciption: text(),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: bigint({ mode: "number" }).notNull().$default(() => Date.now()),
    updatedAt: bigint({ mode: "number" }).notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});