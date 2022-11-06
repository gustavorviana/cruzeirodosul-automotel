import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { GroupPermission } from './GroupPermission';

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

Permission.hasOne(GroupPermission, { foreignKey: 'code', sourceKey: 'code' });