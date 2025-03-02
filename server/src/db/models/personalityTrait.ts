import { AutoIncrement, BelongsTo, Column, Length, Model, AllowNull, PrimaryKey, Table } from 'sequelize-typescript';
import { Character } from '.';

@Table({
    tableName: 'personality_traits',
})
export class PersonalityTrait extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @BelongsTo(() => Character)
    declare characterId: number;

    @Length({ min: 1, max: 1000 })
    @AllowNull(false)
    @Column
    declare description: string;
}
