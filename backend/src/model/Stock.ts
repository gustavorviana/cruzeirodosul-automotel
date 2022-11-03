import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Stock extends Model {
    declare id: number;
    declare productName: string;
    declare quantity: number;
    declare price: number;
}

Stock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Stock',
    freezeTableName: true,
    timestamps: false
});