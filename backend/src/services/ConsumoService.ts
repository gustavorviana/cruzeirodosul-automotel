import { Op } from "sequelize";
import { FrontConsumption } from "../Declarations";
import { BedroomHistory } from "../model/BedroomHistory";
import { Consumption } from "../model/Consumption";
import { Stock } from "../model/Stock";
import { getHistory } from "./BedroomHistoryService";
import { descontarDoEstoque, getStock } from "./StockService";


export async function addProdutoConsumido(idQuarto: number, idProduto: number, qtd: number) {
    const history = await getHistory(idQuarto);
    if (!history)
        throw new Error("O quarto não foi encontrado.");

    const product = await getStock(idProduto);
    if (!product)
        throw new Error("O produto não foi encontrado.");

    if (product.quantity < qtd)
        throw new Error("O produto não foi encontrado nessa quantidade no estoque.");

    const result = await getRoomConsupmition(history.id, idProduto);
    result.quantity += qtd;
    result.save();

    await descontarDoEstoque(idProduto, qtd);
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

export async function getConsumoFromRoomOpenHistory(idQuarto: number) {
    const consumos = await Consumption.findAll({
        include: [Stock, {
            model: BedroomHistory,
            where: {
                bedroomId: idQuarto,
                leaveAt: {
                    [Op.is]: null
                }
            },
            required: true
        }]
    });

    return consumos.map(parseConsumption);
}

function parseConsumption(consumption: Consumption) {
    return {
        id: consumption.id,
        name: consumption.Stock.productName,
        quantity: consumption.quantity,
        total: consumption.quantity * consumption.Stock.price
    } as FrontConsumption;
}
export async function deleteConsumoByRoom(idQuarto: number) {
    const items = await Consumption.findAll({
        include: [Stock, {
            model: BedroomHistory,
            where: {
                bedroomId: idQuarto
            },
            required: true
        }]
    });

    for (let index = 0; index < items.length; index++)
        await items[index].destroy();
}