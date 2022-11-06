import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Group } from './Group';
import { Permission } from './Permission';

export class GroupPermission extends Model {
    declare code: string;
    declare group: number;
}

GroupPermission.init({
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    group: {
        type: DataTypes.NUMBER
    }
}, {
    sequelize,
    modelName: 'GroupPermission',
    freezeTableName: true,
    timestamps: false
});

GroupPermission.hasOne(Group, { sourceKey: 'group', foreignKey: 'id', as: 'GroupObject' });