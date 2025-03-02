import 'reflect-metadata';
import { Character } from '.';
import {
    AllowNull,
    AutoIncrement,
    // BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
// import { CharacterAbility } from '.';

export enum AbilityType {
    ARMORY = 'armory',
    ICONIC = 'iconic',
    PERSONAL = 'personal',
    TEAM = 'team',
}

@Table({
    tableName: 'abilities',
})
export class Ability extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @AllowNull(false)
    @Column
    declare adminOnly: boolean;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(AbilityType)),
    })
    declare type: AbilityType;

    @AllowNull(false)
    @Length({ min: 1, max: 10000 })
    @Column
    declare description: string;

    @ForeignKey(() => Character)
    declare char1Id: number;

    @ForeignKey(() => Character)
    declare char2Id: number;

    // @BelongsToMany(() => Character, () => CharacterAbility)
    // declare characters: Character[];
}
