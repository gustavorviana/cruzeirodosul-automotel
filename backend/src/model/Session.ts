import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { User } from './User';

export class Session extends Model {
    declare user: User;
    declare id: string;
    declare userId: number;
    declare createdAt: Date;

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            createdAt: this.createdAt
        };
    }
}

Session.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Session',
    freezeTableName: true,
    timestamps: false
});