import 'reflect-metadata';
import {
    AllowNull,
    AutoIncrement,
    // BelongsToMany,
    Column,
    DataType,
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
    @Length({ min: 1, max: 100 })
    @Column
    declare name: string;

    @AllowNull(false)
    @Length({ min: 1, max: 10000 })
    @Column({
        type: DataType.TEXT
    })
    declare description: string;

    // @BelongsToMany(() => Character, () => CharacterAbility)
    // declare characters: Character[];
}
