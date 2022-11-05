import { Request, Response } from "express";
import { createHistory, freeBedroom, isBedroomInUse, signalCleared } from "../services/BedroomHistoryService";
import { hasBedroomNumber, registerBedroom, getAll, deleteRoom, getRoom } from "../services/BedroomService";

export async function index(req: Request, res: Response) {
    res.json(await getAll(Number(req.query.peerPage ?? 10), Number(req.query.page ?? 1)));
};

export async function get(req: Request, res: Response) {
    res.json(await getRoom(Number(req.params.id)));
}

export async function deleteRequest(req: Request, res: Response) {
    const id = getRoomId(req);
    if (id < 1)
        return res.status(400).json({ message: 'O quarto é inválido.' });

    if (await isBedroomInUse(id))
        return res.status(400).json({ message: 'Não é possível apagar um quarto enquanto ele está em uso.' });

    await deleteRoom(id);
    res.json({ message: 'Ok' });
};

export async function freeRoom(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O quarto é inválido.' });

    await freeBedroom(id);
    res.json({ message: 'Ok.' });
}

export async function setCustommer(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O quarto é inválido.' });

    const idCustomer = Number(req.body.idCustomer);
    if (idCustomer < 1)
        return res.status(400).json({ message: 'O cliente é inválido.' });

    await createHistory(req.user?.id as any, idCustomer, id);
    res.json({ message: 'Ok.' });
}

export async function limpar(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id < 1)
        return res.status(400).json({ message: 'O quarto é inválido.' });

    signalCleared(id);
    res.json({ message: 'Ok.' });
}

export async function register(req: Request, res: Response) {
    const roomNumber = getRoomNumber(req);
    if (roomNumber <= 0)
        return res.status(400).json({
            message: "O número do quarto é inválido."
        });

    if (await hasBedroomNumber(roomNumber))
        return res.status(400).json({
            message: "Um quarto com esse número já foi registrado."
        });

    registerBedroom(roomNumber);
    res.json({ message: 'Ok.' });
};

function getRoomId(req: Request) {
    const id = Number(req.body.id);
    if (id === NaN)
        return 0;

    return id;
}

function getRoomNumber(req: Request) {
    const roomNumber = Number(req.body.roomNumber);
    if (roomNumber === NaN)
        return 0;

    return roomNumber;
}