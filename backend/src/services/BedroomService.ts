import { Op } from "sequelize";
import { Ocupation, Room } from "../Declarations";
import { Bedroom } from "../model/Bedroom";
import { BedroomHistory } from "../model/BedroomHistory";
import { Customer } from "../model/Customer";
import { deleteHistoryByRoom } from "./BedroomHistoryService";

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

    let mappedRooms = [];

    for (let i = 0; i < rooms.length; i++)
        mappedRooms.push(await translateToFrondBedroom(rooms[i]));

    return mappedRooms;
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

    if (!room)
        return null;

    return await translateToFrondBedroom(room as any);
}

export async function deleteRoom(id: number) {
    await deleteHistoryByRoom(id);
    await Bedroom.destroy({ where: { id } });
}

export async function existBedroom(id: number) {
    return await Bedroom.count({
        where: {
            id: id
        }
    }) > 0;
}

async function translateToFrondBedroom(bedroom: Bedroom) {
    const history = getActiveHistory(bedroom.bedroomhistories);
    return {
        id: bedroom.id,
        roomNumber: bedroom.number,
        ocupationInfo: getOcupationInfo(history),
        cleared: await isCleared(bedroom.id)
    } as Room;
}

async function isCleared(idBedroom: number) {
    return await BedroomHistory.count({
        where: {
            bedroomId: idBedroom,
            cleanedAt:{
                [Op.is]: null
            }
        }
    }) == 0;
}

function getOcupationInfo(history: BedroomHistory | null) {
    if (!history)
        return null;
    return {
        customer: history.customer,
        startAt: history.enterAt
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