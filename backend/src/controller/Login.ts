import { Request, Response } from "express";
import { authUser } from "../services/UserService";

export default async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
        return res.status(400).json({ message: 'Um email e seha devem ser inseridos.' });

    try {
        const session = await authUser(email, password)
        if (!session)
            return res.status(401).json({ message: "Usuário não encontrado." });

        res.json(session);
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar o login",
            error
        });
    }
};