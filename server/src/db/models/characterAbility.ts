import { ForeignKey, Model, Table } from "sequelize-typescript";
import { Character } from "./character";
import { Ability } from "./ability";

@Table({
    tableName: 'character_abilities'
})
export class CharacterAbility extends Model {
    @ForeignKey(() => Character)
    characterId: number;

    @ForeignKey(() => Ability)
    abilityId: number;
}