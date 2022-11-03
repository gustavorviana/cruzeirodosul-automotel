import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Customer } from './Customer';
import { User } from './User';

export class BedroomHistory extends Model {
    declare id: number;
    declare user: User;
    declare customer: Customer;
    declare enterAt: Date;
    declare cleanedAt: Date;
    declare leaveAt: Date;
}

BedroomHistory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    customerId: DataTypes.INTEGER,
    userId: {
        type: DataTypes.INTEGER
    },
    bedroomId: {
        type: DataTypes.INTEGER
    },
    enterAt: {
        type: DataTypes.DATE
    },
    cleanedAt: {
        type: DataTypes.DATE
    },
    leaveAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'bedroomhistory',
    freezeTableName: true,
    timestamps: false
});

BedroomHistory.hasOne(Customer, { sourceKey: 'customerId', foreignKey: 'id' });