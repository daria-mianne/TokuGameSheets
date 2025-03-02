import { Character } from '.';
import { AutoIncrement, Column, DataType, HasMany, Max, Min, Model, AllowNull, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'relationships',
})
export class Relationship extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @Min(-1)
    @Max(1)
    @AllowNull(false)
    @Column
    declare valence: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(1000),
    })
    declare description: string;

    @HasMany(() => Character)
    declare characterIds: number[];
}
