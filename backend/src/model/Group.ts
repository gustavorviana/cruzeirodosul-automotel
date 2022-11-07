import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { PermissionInfo } from '../Declarations';

export class Group extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare permissions: PermissionInfo[];

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            permissions: this.permissions
        };
    }

    public can(code: string) {
        if (!this?.permissions?.length)
            return false;

        code = code.toLowerCase();
        for (let i = 0; i < this.permissions.length; i++)
            if (this.permissions[i].code == code)
                return true;

        return false;
    }
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Group',
    freezeTableName: true,
    timestamps: false
});