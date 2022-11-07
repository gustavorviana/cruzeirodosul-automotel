import { Op } from "sequelize";
import { DashboardCards } from "../Declarations";
import { Customer } from "../model/Customer";
import { Stock } from "../model/Stock";
import sequelize from '../config/db';

export async function getDashboardInfos() {

    return {
        clientes: await countClientes(),
        estoque: await countStockAvailableItems(),
        faturamento: await calcFaturamento()
    } as DashboardCards;
}

async function countClientes() {
    return await Customer.count();
}

async function countStockAvailableItems() {
    return await Stock.count({
        where: {
            quantity: {
                [Op.gt]: 0
            }
        }
    });
}

async function calcFaturamento() {
    const [results] = await sequelize.query(`SELECT SUM((con.quantity * stock.price)) total
    FROM automotel.consumption con
        INNER JOIN stock ON stock.id = con.stockId;`);

    return results.length ? (results[0] as any).total : 0;
}