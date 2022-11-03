import { Op } from "sequelize";
import { BedroomHistory } from "../model/BedroomHistory";
import { existBedroom } from "./BedroomService";
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