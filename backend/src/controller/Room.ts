import { Request, Response } from "express";
import { hasBedroomNumber, registerBedroom, getAll, deleteRoom } from "../services/BedroomService";

export async function index(req: Request, res: Response) {
    try {

        res.json(await getAll(Number(req.body.peerPage ?? 10), Number(req.body.page ?? 1)));
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar a listagem de valores.",
            error
        });
    }
};

export async function deleteRequest(req: Request, res: Response) {
    try {
        const id = getRoomId(req);
        if (id < 1)
            return res.status(404).json({ message: 'O quarto é inválido.' });

        await deleteRoom(id);
        res.json({ message: 'Ok' });
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar a listagem de valores.",
            error
        });
    }
};

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

    try {

        registerBedroom(roomNumber);
        res.json({ message: 'Ok.' });
    } catch (error) {
        res.status(500).json({
            message: "Falha ao realizar o login",
            error
        });
    }
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