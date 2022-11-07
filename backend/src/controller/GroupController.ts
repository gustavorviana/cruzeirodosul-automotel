import * as GroupSvc from '../services/GroupService';
import { Request, Response } from "express";
import { getGroupPermissions } from '../services/GroupService';
import { GerenciarGrupos } from '../Permissions';

export async function index(req: Request, res: Response) {
    if (!req.user?.can(GerenciarGrupos))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await GroupSvc.getAllGroups());
}

export async function cadastrarGrupo(req: Request, res: Response) {
    
}

export async function deleteGroup(req: Request, res: Response) {
    
}

export async function getPermissions(req: Request, res: Response) {
    res.json(await getGroupPermissions(1));
}