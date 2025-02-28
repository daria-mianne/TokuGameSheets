import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from '.';

export enum AbilityType {
    ARMORY = 'armory',
    ICONIC = 'iconic',
    PERSONAL = 'personal',
    TEAM = 'team'
}

export class Ability extends Model<InferAttributes<Ability>, InferCreationAttributes<Ability>> {
    declare id: CreationOptional<number>;
    declare adminOnly: boolean;
    declare type: AbilityType;
    declare description: string;
}

Ability.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        adminOnly: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            // TODO
        },
        description: {
            type: DataTypes.STRING(10000),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'abilities_v0'
    }
);