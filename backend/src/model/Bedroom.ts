import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Bedroom extends Model {
    declare id: number;
    declare number: number;
    declare createdAt: Date;
}

Bedroom.init({
    id: {
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