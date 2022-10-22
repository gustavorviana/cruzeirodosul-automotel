import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Group } from './Group';

export class User extends Model {
    declare id: number;
    declare groupId: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare createdAt: Date;
    declare document: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    createdAt: true,
    timestamps: false
});