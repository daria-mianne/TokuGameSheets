import { AutoIncrement, BelongsTo, Column, Length, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Character } from '.';

@Table({
    tableName: 'backstories',
})
export class Backstory extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @Length({ min: 0, max: 1000000 })
    @Column
    declare backstory: string;

    @BelongsTo(() => Character)
    declare characterId: number;
}
