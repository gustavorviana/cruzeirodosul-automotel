import * as UserSvc from '../services/UserService';
import { Request, Response } from "express";
import { getGroupPermissions } from '../services/GroupService';
import { GerenciarUsuarios } from '../Permissions';

export async function index(req: Request, res: Response) {
    if (!req.user?.can(GerenciarUsuarios))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await UserSvc.getAllUsers());
}

export async function getPermissions(req: Request, res: Response) {
    res.json(await getGroupPermissions(1));
}