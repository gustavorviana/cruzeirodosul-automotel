import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Consumption extends Model {
    declare id: number;
    declare stockId: number;
    declare bedroomId: number;
    declare customerId: number;
    declare quantityId: number;
}

Consumption.init({
    stockId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    bedroomId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerId: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Consumption',
    freezeTableName: true,
    timestamps: false
});