import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { v4 as genUuid4 } from 'uuid';
import { BedroomHistory } from '../model/BedroomHistory';
import { Group } from '../model/Group';
import { Session } from '../model/Session';
import { User } from '../model/User';
import { getGroupPermissions } from './GroupService';

export async function authUser(email: string, password: string) {
    const user = await User.findOne({
        where: { email },
        include: [{
            model: Group,
            as: 'group'
        }]
    });

    if (!user)
        return null;

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword)
        return null;

    user.password = undefined as any;
    if (user.group)
        user.group.permissions = await getGroupPermissions(user.groupId);
    return createSession(user);
}

export async function createUser(name: string, email: string, password: string, groupId: number, document?: string) {
    const encodedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, password: encodedPassword, document, createdAt: new Date(), groupId
    })

    user.password = undefined as any;
}

export async function getAllUsers() {
    const users = await User.findAll({
        include: [{
            model: Group,
            as: 'group'
        }]
    });

    return users.map(u => {
        u.password = undefined as any;
        return u;
    });
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

export async function create(user: User) {
    user.createdAt = new Date();
    user.password = await bcrypt.hash(user.password, 10);
    user.groupId = Number(user.groupId);

    if (await User.count({ where: { email: user.email } }))
        throw new Error("O Email já está em uso.");

    await User.create({ ...user, document: '' });
}

export async function update(id: number, user: User) {
    user.groupId = Number(user.groupId);

    if (!user.password)
        user.password = undefined as any;
    else
        user.password = await bcrypt.hash(user.password, 10);


    if (await User.count({ where: { email: user.email, id: { [Op.not]: id } } }))
        throw new Error("O Email já está em uso.");

    if (id == 1)
        user.groupId = undefined as any;

    await User.update({
        groupId: user.groupId,
        name: user.name,
        email: user.email,
        password: user.password
    }, {
        where: { id: id }
    });
}

export async function remove(id: number) {
    await BedroomHistory.update({ userId: 1 }, { where: { id } })
    await Session.destroy({ where: { userId: id } });
    await User.destroy({ where: { id } });
}
