import { Group } from "../model/Group";
import { GroupPermission } from "../model/GroupPermission";
import { Permission } from "../model/Permission";
import { User } from "../model/User";
import { GerenciarClientes, GerenciarEstoque, GerenciarGrupos, GerenciarQuarto, GerenciarUsuarios, LimparQuarto } from "../Permissions";
import { createUser } from "../services/UserService";

export async function configurePermissions() {
    await Permission.upsert({
        code: GerenciarGrupos,
        name: "Gerenciar grupos"
    });
    await Permission.upsert({
        code: GerenciarUsuarios,
        name: "Gerenciar usuários"
    });
    await Permission.upsert({
        code: GerenciarQuarto,
        name: "Gerenciar quartos"
    });
    await Permission.upsert({
        code: GerenciarEstoque,
        name: "Gerenciar estoque"
    });
    await Permission.upsert({
        code: GerenciarClientes,
        name: "Gerenciar clientes"
    });
    await Permission.upsert({
        code: LimparQuarto,
        name: "Limpar quarto"
    });
}

export async function configureGroupPermissions() {
    await configureGroupAllPermissions(1, [LimparQuarto, GerenciarUsuarios, GerenciarQuarto, GerenciarEstoque, GerenciarClientes, GerenciarGrupos]);
    await configureGroupAllPermissions(2, [GerenciarQuarto, GerenciarEstoque, GerenciarClientes]);
    await configureGroupAllPermissions(3, [GerenciarEstoque]);
    await configureGroupAllPermissions(4, [LimparQuarto]);
}

export async function configureGroups() {
    await Group.upsert({
        id: 1,
        name: "Administrador",
        description: "Grupo para usuários administradores."
    });

    await Group.upsert({
        id: 2,
        name: "Atendente",
        description: "Grupo para atendentes."
    });

    await Group.upsert({
        id: 3,
        name: "Estoque",
        description: "Grupo para pessoal de estoque."
    });

    await Group.upsert({
        id: 4,
        name: "Limpeza",
        description: "Grupo para pessoal de limpeza."
    });
}

export async function configureUsers() {
    if (await User.count() > 0)
        return;

    console.log('Criando usuário administrador...');
    await createUser('Administrador', 'admin@automotel.com', 'admin', 1);
}

async function configureGroupAllPermissions(idGroup: number, codes: string[]) {
    for (let i = 0; i < codes.length; i++) {
        GroupPermission.upsert({
            code: codes[i],
            group: idGroup
        });
    }
}