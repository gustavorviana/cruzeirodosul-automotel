import { Op } from "sequelize";
import { Customer } from "../model/Customer";

export async function getCustomers(peerPage: number, page: number) {
    return await Customer.findAll({
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
    return await Customer.create({
        name: customer.name,
        document: customer.document
    });
}