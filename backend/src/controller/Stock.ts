import * as Stock from '../services/StockService';
import { Request, Response } from "express";
import { GerenciarEstoque, GerenciarQuarto } from '../Permissions';

export async function index(req: Request, res: Response) {
    if (!req.user?.can(GerenciarEstoque) && !req.user?.can(GerenciarQuarto))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await Stock.getAll(req.query.name as string));
}

export async function get(req: Request, res: Response) {
    if (!req.user?.can(GerenciarEstoque))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O id é inválido.' });

    const item = await Stock.getStock(id);
    if (item)
        return res.json(item);

    res.status(404).json({ message: 'Item não encontrado' });
}

export async function destroy(req: Request, res: Response) {
    if (!req.user?.can(GerenciarEstoque))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O id é inválido.' });

    await Stock.remove(id);
    res.json({ message: 'Ok' });
}

export async function create(req: Request, res: Response) {
    if (!req.user?.can(GerenciarEstoque))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    await Stock.create(req.body.productName, Number(req.body.quantity), Number(req.body.price));
    res.json({ message: 'Ok' });
}

export async function update(req: Request, res: Response) {
    if (!req.user?.can(GerenciarEstoque))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O id é inválido.' });

    await Stock.update(id, req.body.productName, Number(req.body.quantity), Number(req.body.price));
    res.json({ message: 'Ok' });
}