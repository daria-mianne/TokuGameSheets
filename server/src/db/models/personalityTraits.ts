import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Character } from "./character";
import { sequelize } from ".";

export class PersonalityTrait extends Model<InferAttributes<PersonalityTrait>, InferCreationAttributes<PersonalityTrait>> {
    declare id: CreationOptional<number>;
    declare characterId: ForeignKey<Character['id']>;
    declare description: string;
}

PersonalityTrait.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'personality_traits',
    }
);