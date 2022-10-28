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
        primaryKey: true,
        allowNull: false
    },
    customerId: DataTypes.INTEGER,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedroomId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enterAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cleanedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    leaveAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'bedroomhistory',
    freezeTableName: true,
    timestamps: false
});

// BedroomHistory.hasOne(User, { sourceKey: 'userId', foreignKey: 'id' });
BedroomHistory.hasOne(Customer, { sourceKey: 'customerId', foreignKey: 'id' });