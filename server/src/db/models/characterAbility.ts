import { ForeignKey, Model, Table } from "sequelize-typescript";
import { Character } from "./character";
import { Ability } from "./ability";

@Table({
    tableName: 'character_abilities'
})
export class CharacterAbility extends Model {
    @ForeignKey(() => Character)
    declare characterId: number;

    @ForeignKey(() => Ability)
    declare abilityId: number;
}