import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Customer } from './Customer';
import { User } from './User';

export class BedroomHistory extends Model {
    declare id: number;
    declare user: User;
    declare customer: Customer;
}

BedroomHistory.init({
    int: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Bedroom',
    freezeTableName: true,
    timestamps: false
});