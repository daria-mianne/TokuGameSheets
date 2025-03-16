import 'reflect-metadata';
import {
    AutoIncrement,
    // BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
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
    @Column({
        type: DataType.TEXT,
    })
    declare backstory: string;

    @ForeignKey(() => Character)
    @Column
    declare characterId: number;

    // @BelongsTo(() => Character)
    // declare character: Character;
}
