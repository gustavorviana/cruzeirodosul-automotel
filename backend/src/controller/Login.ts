import { Request, Response } from "express";
import { authUser } from "../services/UserService";

export default async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
        return res.status(400).json({ message: 'Um email e senha devem ser inseridos.' });

    const session = await authUser(email, password)
    if (!session)
        return res.status(401).json({ message: "Usuário não encontrado." });

    res.json(session);
};