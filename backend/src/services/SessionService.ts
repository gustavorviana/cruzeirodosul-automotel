import { Request } from "express";
import { Group } from "../model/Group";
import { Session } from "../model/Session";
import { User } from "../model/User";
import { getGroupPermissions } from "./GroupService";

export async function getUserFromRequest(req: Request) {
    const sessionId = req.headers.session;
    return await getUserBySessionId(sessionId as string);
}

export async function getUserBySessionId(id: string) {
    if (!id)
        return null;

    const session = await Session.findOne({
        include: [{
            model: User,
            include: [{
                model: Group,
                as: 'group'
            }]
        }],
        where: { id }
    });

    if (!session?.user)
        return null;

    session.user.password = undefined as any;
    if (session.user.group)
        session.user.group.permissions = await getGroupPermissions(session.user.groupId);

    return session.user;
}

export async function logout(id: string) {
    await Session.destroy({
        where: {
            id: id
        }
    });
}