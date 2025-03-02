import { Character } from ".";
import { AutoIncrement, BelongsToMany, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { CharacterAbility } from '.';

export enum AbilityType {
    ARMORY = 'armory',
    ICONIC = 'iconic',
    PERSONAL = 'personal',
    TEAM = 'team'
}

@Table({
    tableName: 'abilities'
})
export class Ability extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    declare id: number;
    
    @Column
    @NotNull
    declare adminOnly: boolean;
    
    @Column({
        type: DataType.ENUM,
    })
    @NotNull
    declare type: AbilityType;
    
    @Column
    @NotNull
    @Length({ min: 1, max: 10000 })
    declare description: string;

    @BelongsToMany(() => Character, () => CharacterAbility)
    declare characters: Character[];
}
