import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";
import { Backstory } from "./backstory";
import { sequelize } from ".";

export class Character extends Model<InferAttributes<Character>, InferCreationAttributes<Character>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare name: string;
    declare isNpc: boolean;
    declare pronouns: string;
    declare backstoryId?: CreationOptional<ForeignKey<Backstory['id']>>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        isNpc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        pronouns: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'characters',
    }
)
