import 'reflect-metadata';
import {
    AutoIncrement,
    Column,
    DataType,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

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

    // @BelongsTo(() => Character)
    // declare character: Character;
}
