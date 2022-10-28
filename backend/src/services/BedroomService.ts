import { Op } from "sequelize";
import { Ocupation, Room } from "../Declarations";
import { Bedroom } from "../model/Bedroom";
import { BedroomHistory } from "../model/BedroomHistory";
import { Customer } from "../model/Customer";
import { TimeService } from "./TimeService";

export async function hasBedroomNumber(roomNumber: number) {
    return await Bedroom.count({ where: { number: roomNumber } }) > 0;
}

export async function registerBedroom(roomNumber: number) {
    await Bedroom.create({ number: roomNumber, createdAt: new Date() });
}

export async function getAll(peerPage: number, page: number) {
    const room = await Bedroom.findAll({
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

    return room.map(translateToFrondBedroom);
}

export async function deleteRoom(id: number) {
    await BedroomHistory.destroy({ where: { bedroomId: id } });
    await Bedroom.destroy({ where: { id } });
}

function translateToFrondBedroom(bedroom: Bedroom) {
    return {
        id: bedroom.id,
        roomNumber: bedroom.number,
        ocupationInfo: getOcupationInfo(bedroom.bedroomhistories)
    } as Room;
}

function getOcupationInfo(histories: BedroomHistory[]) {
    if (!histories?.length)
        return {};

    const history = histories[0];
    const timeSpent = new Date().getTime() - history.enterAt.getTime();

    return {
        customer: history.customer,
        startAt: history.enterAt,
        timeInfo: new TimeService(timeSpent).info
    } as Ocupation;
}