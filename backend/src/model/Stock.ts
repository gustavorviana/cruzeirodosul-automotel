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
        primaryKey: true,
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Stock',
    freezeTableName: true,
    timestamps: false
});