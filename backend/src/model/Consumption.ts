import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Stock } from './Stock';

export class Consumption extends Model {
    declare id: number;
    declare stockId: number;
    declare bedroomHistoryId: number;
    declare quantity: number;
    declare Stock: Stock;
}

Consumption.init({
    stockId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    bedroomHistoryId: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Consumption',
    freezeTableName: true,
    timestamps: false
});

Consumption.hasOne(Stock, { sourceKey: 'stockId', foreignKey: 'id' })