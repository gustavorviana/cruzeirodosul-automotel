import bcrypt from 'bcrypt';
import { v4 as genUuid4 } from 'uuid';
import { Session } from '../model/Session';
import { User } from '../model/User';

export async function authUser(email: string, password: string) {
    const user = await User.findOne({
        where: { email }
    });

    if (!user)
        return null;

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword)
        return null;

    user.password = undefined as any;
    return createSession(user);
}

export async function createUser(name: string, email: string, password: string, groupId: number, document?: string) {
    const encodedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, password: encodedPassword, document, createdAt: new Date(), groupId
    })

    user.password = undefined as any;
}

async function createSession(user: User) {
    const session = await Session.create({
        id: genUuid4(),
        userId: user.id,
        createdAt: new Date()
    });

    session.user = user;
    return session;
}