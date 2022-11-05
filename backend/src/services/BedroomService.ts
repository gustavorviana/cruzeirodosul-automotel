import { Op } from "sequelize";
import { FrontConsumption, Ocupation, Room } from "../Declarations";
import { Bedroom } from "../model/Bedroom";
import { BedroomHistory } from "../model/BedroomHistory";
import { Consumption } from "../model/Consumption";
import { Customer } from "../model/Customer";
import { Stock } from "../model/Stock";
import { TimeService } from "./TimeService";

export async function hasBedroomNumber(roomNumber: number) {
    return await Bedroom.count({ where: { number: roomNumber } }) > 0;
}

export async function registerBedroom(roomNumber: number) {
    await Bedroom.create({ number: roomNumber, createdAt: new Date() });
}

export async function getAll(peerPage: number, page: number) {
    const rooms = await Bedroom.findAll({
        include: [
            {
                model: BedroomHistory,
                required: false,
                limit: 1,
                include: [Customer],
                where: {
                    leaveAt: {
                        [Op.is]: null
                    }
                }
            }
        ],
        limit: peerPage,
        offset: peerPage * (page - 1),
        order: ['number']
    });

    return rooms.map(translateToFrondBedroom);
}

export async function getRoom(id: number) {
    if (id < 1)
        throw new Error('O quarto não foi encontrado.');

    const room = await Bedroom.findOne({
        include: [
            {
                model: BedroomHistory,
                required: false,
                limit: 1,
                include: [Customer],
                where: {
                    leaveAt: {
                        [Op.is]: null
                    }
                }
            }
        ],
        where: {
            id
        }
    });

    return translateToFrondBedroom(room as any);
}

export async function deleteRoom(id: number) {
    await BedroomHistory.destroy({ where: { bedroomId: id } });
    await Bedroom.destroy({ where: { id } });
}

export async function existBedroom(id: number) {
    return await Bedroom.count({
        where: {
            id: id
        }
    }) > 0;
}

function translateToFrondBedroom(bedroom: Bedroom) {
    const history = getActiveHistory(bedroom.bedroomhistories);
    return {
        id: bedroom.id,
        roomNumber: bedroom.number,
        ocupationInfo: getOcupationInfo(history)
    } as Room;
}

function getOcupationInfo(history: BedroomHistory | null) {
    if (!history)
        return null;

    const timeSpent = new Date().getTime() - history.enterAt.getTime();

    return {
        customer: history.customer,
        startAt: history.enterAt,
        timeInfo: new TimeService(timeSpent).info
    } as Ocupation;
}

function getActiveHistory(histories: BedroomHistory[]) {
    if (!histories?.length)
        return null;

    histories = histories.filter(h => !h.leaveAt);
    if (!histories.length)
        return null;

    return histories[0];
}