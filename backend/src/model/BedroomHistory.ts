import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Bedroom } from './Bedroom';
import { Consumption } from './Consumption';
import { Customer } from './Customer';
import { User } from './User';

export class BedroomHistory extends Model {
    declare id: number;
    declare user: User;
    declare customer: Customer;
    declare enterAt: Date;
    declare cleanedAt: Date;
    declare leaveAt: Date;
    declare Consumptions: Consumption[];
    declare Bedroom: Bedroom;

    public toJSON() {
        return {
            id: this.id,
            user: this.user,
            customer: this.customer,
            enterAt: this.enterAt,
            cleanedAt: this.cleanedAt,
            leaveAt: this.leaveAt,
            Consumptions: this.Consumptions,
            bedroom: this.Bedroom
        };
    }
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
BedroomHistory.hasMany(Consumption, { sourceKey: 'id', foreignKey: 'bedroomHistoryId' });
Consumption.belongsTo(BedroomHistory, { foreignKey: 'bedroomHistoryId', targetKey: 'id' });

Bedroom.hasMany(BedroomHistory, { sourceKey: 'id', foreignKey: 'bedroomId' });
BedroomHistory.hasOne(Bedroom, { sourceKey: 'bedroomId', foreignKey: 'id' });