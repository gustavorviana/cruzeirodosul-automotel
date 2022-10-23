import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Group extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Group',
    freezeTableName: true,
    timestamps: false
});