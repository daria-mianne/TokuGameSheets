import { AutoIncrement, BelongsTo, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Character } from "./character";

@Table({
    tableName: 'personality_traits'
})
export class PersonalityTrait extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    id: number;
    
    @BelongsTo(() => Character)
    characterId: number;
    
    @Column
    @Length({ min: 1, max: 1000 })
    @NotNull
    description: string;
}
