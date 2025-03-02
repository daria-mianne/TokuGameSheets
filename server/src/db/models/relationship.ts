import { Character } from ".";
import { AutoIncrement, Column, DataType, HasMany, Max, Min, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'relationships'
})
export class Relationship extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    declare id!: number;
    
    @Column
    @Min(-1)
    @Max(1)
    @NotNull
    valence!: number;
    
    @Column({
        type: DataType.STRING(1000)
    })
    @NotNull
    declare description: string;

    @HasMany(() => Character)
    declare characterIds: number[];
}
