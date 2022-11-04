import { Op } from "sequelize";
import { BedroomHistory } from "../model/BedroomHistory";
import { Consumption } from "../model/Consumption";
import { existBedroom } from "./BedroomService";
import { existCustomer } from "./CustomerService";
import { descontarDoEstoque, getStock } from "./StockService";

export async function createHistory(userId: number, idCustomer: number, idBedroom: number) {
    if (!await existCustomer(idCustomer))
        throw new Error('O cliente não foi encontrado.');

    if (!await existBedroom(idBedroom))
        throw new Error("O quarto não foi encontrado.");

    if (await isBedroomInUse(idBedroom))
        throw new Error("O quarto já está em uso.");

    return await BedroomHistory.create({
        userId: userId,
        customerId: idCustomer,
        bedroomId: idBedroom,
        enterAt: new Date()
    });
}

export async function freeBedroom(id: number) {
    if (!await isBedroomInUse(id))
        throw new Error("O quarto não está ocupado.");

    await BedroomHistory.update({ leaveAt: new Date() }, {
        where: {
            leaveAt: {
                [Op.is]: null
            },
            bedroomId: id
        }
    });
}

export async function isBedroomInUse(id: number) {
    return await BedroomHistory.count({
        where: {
            leaveAt: {
                [Op.is]: null
            },
            bedroomId: id
        }
    }) > 0;
}

export async function addProdutoConsumido(idQuarto: number, idProduto: number, qtd: number) {
    const history = await getHistory(idQuarto);
    if (!history)
        throw new Error("O quarto não foi encontrado.");

    const product = await getStock(idProduto);
    if (!product)
        throw new Error("O produto não foi encontrado.");

    const result = await getRoomConsupmition(history.id, idProduto);
    result.quantity += qtd;
    result.save();

    await descontarDoEstoque(idQuarto, 1);
}

async function getRoomConsupmition(idHistory: number, idProduto: number) {
    let result = await Consumption.findOne({
        where: {
            bedroomHistoryId: idHistory,
            stockId: idProduto
        }
    });
    if (result)
        return result;

    return await Consumption.create({
        stockId: idProduto,
        bedroomHistoryId: idHistory,
        quantity: 0
    });
}

export async function getHistory(idQuarto: number) {
    return await BedroomHistory.findOne({
        where: {
            leaveAt: {
                [Op.is]: null
            },
            bedroomId: idQuarto
        }
    });
}