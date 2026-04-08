import { auth } from "../../lib/auth";
import db from "../../db/index";
import { relatives } from "../../db/schemas/relatives";

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({ headers: event.headers });

    if (!session?.user?.id) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const body = await readBody(event);
    const { name, key, relation, description } = body;

    if (!name || !relation) {
        throw createError({ statusCode: 400, statusMessage: "Name and relation are required" });
    }

    const newRelative = await db.insert(relatives).values({
        name,
        key: key ?? "",
        relation,
        desciption: description ?? null,
        userId: session.user.id,
    }).returning();

    return newRelative[0];
});
