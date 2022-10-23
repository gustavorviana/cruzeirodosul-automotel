import { Group } from "../model/Group";
import { User } from "../model/User";
import { createUser } from "../services/UserService";

export async function configureGroups() {
    await Group.upsert({
        id: 1,
        name: "Administrador",
        description: "Grupo para usuários administradores."
    });
}

export async function configureUsers() {
    if (await User.count() > 0)
        return;

    console.log('Criando usuário administrador...');
    await createUser('Administrador', 'admin@automotel.com', 'admin', 1);
}