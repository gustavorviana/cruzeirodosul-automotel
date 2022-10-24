import { Request, Response } from "express";
import { Session } from "../model/Session";
import { authUser } from "../services/UserService";

export default async (req: Request, res: Response) => {
    const session = req.body.session;
    if (!session)
        return res.send({ message: 'Ok' });

    await Session.destroy({
        where: {
            id: session
        }
    });

    return res.send({ message: 'Ok' });
};