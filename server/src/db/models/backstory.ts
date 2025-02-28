import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from ".";

export class Backstory extends Model<InferAttributes<Backstory>, InferCreationAttributes<Backstory>> {
    declare id: CreationOptional<number>;
    declare backstory: string;
}

Backstory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        backstory: {
            type: DataTypes.STRING(1000000),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'backstories'
    }
)