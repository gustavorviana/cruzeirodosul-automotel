import { Request, Response } from "express";
import { logout } from "../services/SessionService";

export default async (req: Request, res: Response) => {
    const session = req.body.session;
    if (!session)
        return res.send({ message: 'Ok' });

    await logout(session);
    return res.send({ message: 'Ok' });
};