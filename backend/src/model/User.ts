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
    declare group: Group;

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            document: this.document,
            group: this.group ?? null,
            createdAt: this.createdAt
        };
    }

    public can(code: string) {
        return this.group?.can(code) ?? false;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    document: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    createdAt: true,
    timestamps: false
});

User.hasOne(Group, { sourceKey: 'groupId', foreignKey: 'id', as: 'group' });