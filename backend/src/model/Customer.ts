import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Customer extends Model {
    declare id: number;
    declare name: string;
    declare document: string;
}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'customer',
    freezeTableName: true,
    timestamps: false
});