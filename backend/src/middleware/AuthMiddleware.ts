import { NextFunction, Request, Response } from "express";
import { getUserFromRequest } from "../services/SessionService";

export default function(req: Request, res: Response, next: NextFunction) {
    if (!req.url.startsWith('/api') || req.url.startsWith('/api/login') || req.url.startsWith('/api/logout'))
        return next();

    getUserFromRequest(req).then(user => {
        if (!user)
            return res.status(401).json({ message: 'Você deve estar logado para essa operação.' });
        req.user = user;
        next();
    }).catch(er =>
        res.status(500).json(er)
    );
}