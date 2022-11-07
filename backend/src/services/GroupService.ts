import { GroupPermission } from "../model/GroupPermission";
import { Permission } from "../model/Permission";
import { PermissionInfo } from '../Declarations'
import { Group } from "../model/Group";

export async function getGroupPermissions(groupId: number) {
    const perms = await Permission.findAll({
        include: [{
            model: GroupPermission,
            where: {
                group: groupId
            }
        }]
    });

    return perms.map(p => {
        return { name: p.name, code: p.code } as PermissionInfo
    });
}


export async function getAllGroups() {
    return await Group.findAll();
}