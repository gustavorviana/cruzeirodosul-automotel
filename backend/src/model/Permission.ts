import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Permission extends Model {
    declare code: string;
    declare name: string;
}

Permission.init({
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Permission',
    freezeTableName: true,
    timestamps: false
});