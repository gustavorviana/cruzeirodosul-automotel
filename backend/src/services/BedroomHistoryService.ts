import { Op } from "sequelize";
import { Bedroom } from "../model/Bedroom";
import { BedroomHistory } from "../model/BedroomHistory";
import { Consumption } from "../model/Consumption";
import { Customer } from "../model/Customer";
import { Stock } from "../model/Stock";
import { existBedroom } from "./BedroomService";
import { deleteConsumoByRoom } from "./ConsumoService";
import { existCustomer } from "./CustomerService";

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

export async function signalCleared(idQuarto: number) {
    await BedroomHistory.update({ cleanedAt: new Date() },
        {
            where: {
                bedroomId: idQuarto,
                cleanedAt: {
                    [Op.is]: null
                }
            }
        }
    );
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

export async function getAllHistry() {
    return await BedroomHistory.findAll({
        include: [Customer, {
            model: Consumption,
            include: [Stock]
        }, Bedroom]
    });
}

export async function deleteHistoryByRoom(idQuarto: number) {
    await deleteConsumoByRoom(idQuarto);
    await BedroomHistory.destroy({ where: { bedroomId: idQuarto } });
}