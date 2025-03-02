import 'reflect-metadata';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Character } from '.';
import { Ability } from '.';

@Table({
    tableName: 'character_abilities',
})
export class CharacterAbility extends Model {
    @ForeignKey(() => Character)
    @Column
    declare characterId: number;

    @ForeignKey(() => Ability)
    @Column
    declare abilityId: number;
}
