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
    id: number;
    
    @Column
    @NotNull
    adminOnly: boolean;
    
    @Column({
        type: DataType.ENUM,
    })
    @NotNull
    type: AbilityType;
    
    @Column
    @NotNull
    @Length({ min: 1, max: 10000 })
    description: string;

    @BelongsToMany(() => Character, () => CharacterAbility)
    characters: Character[];
}
