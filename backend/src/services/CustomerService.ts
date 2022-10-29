import { Op } from "sequelize";
import { Customer } from "../model/Customer";

export async function getCustomers(name: string, peerPage: number, page: number) {
    if (typeof (name) != 'string')
        name = '';

    return await Customer.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        limit: peerPage,
        offset: peerPage * (page - 1),
        order: ['id']
    });
}

export async function getCustomer(id: number) {
    return await Customer.findOne({
        where: {
            id: {
                [Op.eq]: id
            }
        }
    })
}

export async function registerCustomer(customer: Customer) {
    if (await existDocument(customer.document))
        throw new Error('Este documento já foi registrado.');

    return await Customer.create({
        name: customer.name,
        document: customer.document
    });
}

async function existDocument(document: string) {
    return await Customer.count({
        where: {
            document: {
                [Op.eq]: document
            }
        }
    }) > 0;
}

export async function existCustomer(id: number) {
    return await Customer.count({
        where: {
            id: id
        }
    }) > 0;
}
