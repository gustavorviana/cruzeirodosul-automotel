import * as UserSvc from '../services/UserService';
import { Request, Response } from "express";
import { getGroupPermissions } from '../services/GroupService';
import { GerenciarUsuarios } from '../Permissions';

export async function index(req: Request, res: Response) {
    if (!req.user?.can(GerenciarUsuarios))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await UserSvc.getAllUsers());
}

export async function destroy(req: Request, res: Response) {
    if (!req.user?.can(GerenciarUsuarios))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 2)
        return res.status(400).json({ message: 'O id é inválido.' });

    await UserSvc.remove(id);
    res.json({ message: 'Ok' });
}

export async function create(req: Request, res: Response) {
    if (!req.user?.can(GerenciarUsuarios))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    await UserSvc.create(req.body);
    res.json({ message: 'Ok' });
}

export async function update(req: Request, res: Response) {
    if (!req.user?.can(GerenciarUsuarios))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O id é inválido.' });

    await UserSvc.update(id, req.body);
    res.json({ message: 'Ok' });
}