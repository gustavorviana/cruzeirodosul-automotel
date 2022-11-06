import { Request, Response } from "express";
import { GerenciarQuarto } from "../Permissions";
import { addProdutoConsumido, getConsumoFromRoomOpenHistory } from "../services/ConsumoService";

export async function get(req: Request, res: Response) {
    if (!req.user?.can(GerenciarQuarto))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    res.json(await getConsumoFromRoomOpenHistory(Number(req.params.idQuarto)));
}

export async function consumirProduto(req: Request, res: Response) {
    if (!req.user?.can(GerenciarQuarto))
        return res.status(403).json({ message: 'Sem permissão para isso.' });

    const id = Number(req.body.idQuarto);
    const idProduto = Number(req.body.idProduto);
    const qtd = Number(req.body.quantity);

    if (id < 1)
        return res.status(400).json({ message: 'O quarto é inválido.' });

    if (idProduto < 1)
        return res.status(400).json({ message: 'O produto é inválido.' });

    if (qtd < 1)
        return res.status(400).json({ message: 'A quantidade deve ser no mínimo 1.' });

    await addProdutoConsumido(id, idProduto, qtd);
    res.json({ message: 'Ok.' });
}
