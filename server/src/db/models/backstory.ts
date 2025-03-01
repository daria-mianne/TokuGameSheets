import { AutoIncrement, BelongsTo, Column, DataType, Length, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Character } from "./character";

@Table({
    tableName: 'backstories'
})
export class Backstory extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    id: number;

    @Column
    @Length({ min: 0, max: 1000000 })
    backstory: string;

    @BelongsTo(() => Character)
    characterId: number;
}
