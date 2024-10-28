import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const tasks = sqliteTable("tasks", {
    id: integer("id", { mode: "number" })
        .primaryKey({ autoIncrement: true }),
    title: text("title")
        .notNull(),
    completed: integer("completed", { mode: "boolean" })
        .notNull()
        .default(false),
    createdAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(
    tasks,
    {
        title: schema => schema.title.min(1).max(500),
    },
).required({
    completed: true,
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const patchTasksSchema = insertTasksSchema.partial();