import { eq } from "drizzle-orm";
import { auth } from "../../lib/auth";
import db from "../../db/index";
import { relatives } from "../../db/schemas/relatives";


export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({ headers: event.headers });

    if (!session?.user?.id) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const allRelatives = await db.query.relatives.findMany({
        where: eq(relatives.userId, session.user.id),
    });

    return allRelatives;
});
