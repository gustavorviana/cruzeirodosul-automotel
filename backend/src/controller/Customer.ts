import { Request, Response } from "express";
import { getCustomer, getCustomers, registerCustomer } from "../services/CustomerService";

export async function index(req: Request, res: Response) {
    res.json(await getCustomers(req.query.name as string, Number(req.query.peerPage as string ?? 10), Number(req.query.page as string ?? 1)));
};

export async function get(req: Request, res: Response) {
    res.json(await getCustomer(Number(req.params.id)));
}

export async function register(req: Request, res: Response) {
    await registerCustomer(req.body);
    res.json({ message: 'Ok.' });
};