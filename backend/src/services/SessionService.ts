import { Request } from "express";
import { Session } from "../model/Session";
import { User } from "../model/User";

export async function getUserFromRequest(req: Request) {
    const sessionId = req.headers.session;
    return await getUserBySessionId(sessionId as string);
}

export async function getUserBySessionId(id: string) {
    if (!id)
        return null;

    const session = await Session.findOne({
        include: User,
        where: { id }
    });

    return session?.user;
}

export async function logout(id: string) {
    await Session.destroy({
        where: {
            id: id
        }
    });
}