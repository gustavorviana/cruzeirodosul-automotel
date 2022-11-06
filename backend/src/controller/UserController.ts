import * as UserSvc from '../services/UserService';
import { Request, Response } from "express";
import { getGroupPermissions } from '../services/GroupService';

export async function index(req: Request, res: Response) {
    res.json(await UserSvc.getAllUsers());
}

export async function getPermissions(req: Request, res: Response) {
    res.json(await getGroupPermissions(1));
}