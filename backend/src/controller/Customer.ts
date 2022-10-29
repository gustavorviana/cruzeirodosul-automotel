import { Request, Response } from "express";
import { getCustomer, getCustomers, registerCustomer } from "../services/CustomerService";

export async function index(req: Request, res: Response) {
    try {
        res.json(await getCustomers(Number(req.body.peerPage ?? 10), Number(req.body.page ?? 1)));
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar a listagem de valores.",
            error
        });
    }
};

export async function get(req: Request, res: Response) {
    try {
        res.json(await getCustomer(Number(req.params.id)));
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar ao recuperar cliente.",
            error
        });
    }
}

export async function register(req: Request, res: Response) {
    try {
        await registerCustomer(req.body);
        res.json({ message: 'Ok.' });
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar o login",
            error
        });
    }
};