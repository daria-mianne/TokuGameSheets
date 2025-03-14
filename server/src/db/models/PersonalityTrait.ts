import 'reflect-metadata';
import {
    AutoIncrement,
    // BelongsTo,
    Column,
    Length,
    Model,
    AllowNull,
    PrimaryKey,
    Table,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import { Character } from '.';

@Table({
    tableName: 'personality_traits',
})
export class PersonalityTrait extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @ForeignKey(() => Character)
    @Column
    declare characterId: number;

    // @BelongsTo(() => Character)
    // declare character: Character;

    @Length({ min: 1, max: 1000 })
    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    declare description: string;
}
