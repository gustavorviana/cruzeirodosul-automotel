import { Op } from "sequelize";
import { Stock } from "../model/Stock";

export async function getAll(name: string) {
    if (name === undefined)
        name = '';
        
    return await Stock.findAll({
        where: {
            productName: {
                [Op.like]: `%${name}%`
            }
        }
    });
}

export async function getStock(id: number) {
    return await Stock.findByPk(id);
}

export async function create(name: string, quantity: number, price: number) {
    if (!name || name.length < 3)
        throw new Error("O nome do produto deve ter pelo menos 3 caracteres.");

    await Stock.create({
        productName: name,
        quantity,
        price
    });
}

export async function update(id: number, name: string, quantity: number, price: number) {
    await Stock.update({
        productName: name,
        quantity,
        price
    }, {
        where: { id }
    });
}

export async function remove(id: number) {
    await Stock.destroy({ where: { id } });
}

export async function hasStockItem(id: number) {
    await Stock.count({ where: { id } }) > 0;
}

export async function descontarDoEstoque(id: number, qtd: number) {
    const item = await getStock(id);
    if (!item)
        throw new Error("O item não foi encontrado.");

    item.quantity -= qtd;
    await item.save();
}