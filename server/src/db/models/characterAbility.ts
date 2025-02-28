import { ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Character } from "./character";
import { Ability } from "./ability";
import { sequelize } from ".";

export class CharacterAbility extends Model<InferAttributes<CharacterAbility>, InferCreationAttributes<CharacterAbility>> {
    declare characterId: ForeignKey<Character['id']>;
    declare abilityId: ForeignKey<Ability['id']>;
}

CharacterAbility.init(
    {},
    {
        sequelize,
        tableName: 'character_abilities',
    }
);