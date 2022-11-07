import { Request, Response } from "express";
import { GerenciarClientes } from "../Permissions";
import { getCustomer, getCustomers, registerCustomer, updateCustomer } from "../services/CustomerService";

export async function index(req: Request, res: Response) {
    if (!req.user?.can(GerenciarClientes))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await getCustomers(req.query.name as string, Number(req.query.peerPage as string ?? 10), Number(req.query.page as string ?? 1)));
};

export async function get(req: Request, res: Response) {
    if (!req.user?.can(GerenciarClientes))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await getCustomer(Number(req.params.id)));
}

export async function update(req: Request, res: Response) {
    if (!req.user?.can(GerenciarClientes))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O id é inválido.' });

    if (String(req.body.name).length < 3 || String(req.body.name).length > 255)
        return res.status(400).json({ message: 'O nome deve ter entre 3 e 255 caracteres.' });

    if (String(req.body.document).length > 14)
        return res.status(400).json({ message: 'O nome deve ter entre 3 e 255 caracteres.' });

    await updateCustomer(id, req.body.name, req.body.document);
    res.json({ message: 'Ok' });
}

export async function register(req: Request, res: Response) {
    if (!req.user?.can(GerenciarClientes))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    await registerCustomer(req.body);
    res.json({ message: 'Ok.' });
};