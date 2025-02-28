import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Character } from "./character";
import { sequelize } from ".";

export class Relationship extends Model<InferAttributes<Relationship>, InferCreationAttributes<Relationship>> {
    declare id: CreationOptional<number>;
    declare char1Id: ForeignKey<Character['id']>;
    declare char2Id: ForeignKey<Character['id']>;
    declare valence: -1 | 0 | 1;
    declare description: string;
}

Relationship.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        valence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'relationships',
    }
);