import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from "sequelize"
import { User } from "./user";
import { sequelize } from ".";

export class Invitation extends Model<InferAttributes<Invitation>, InferCreationAttributes<Invitation>> {
    declare id: CreationOptional<number>;
    declare guid: string;
    declare invitingUserId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

Invitation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        guid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'invitations',
    }
);