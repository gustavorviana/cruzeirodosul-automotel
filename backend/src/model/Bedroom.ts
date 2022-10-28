import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { BedroomHistory } from './BedroomHistory';

export class Bedroom extends Model {
    declare id: number;
    declare number: number;
    declare createdAt: Date;
    declare bedroomhistories: BedroomHistory[];
}

Bedroom.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    number: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Bedroom',
    freezeTableName: true,
    timestamps: false
});

Bedroom.hasMany(BedroomHistory, { sourceKey: 'id', foreignKey: 'bedroomId' });