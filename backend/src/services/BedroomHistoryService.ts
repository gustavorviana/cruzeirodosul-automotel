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

export async function isBedroomInUse(id: number) {
    return await BedroomHistory.count({
        where: {
            enterAt: {
                [Op.not]: null
            }
        }
    }) > 0;
}