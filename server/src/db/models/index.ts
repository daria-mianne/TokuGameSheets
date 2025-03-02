import { dbConfig } from '@config/dbConfig';
import { Sequelize } from 'sequelize-typescript';
import { Ability } from './Ability';
import { Backstory } from './Backstory';
import { Character } from './Character';
import { CharacterAbility } from './CharacterAbility';
import { Invitation } from './Invitation';
import { PersonalityTrait } from './PersonalityTrait';
import { Relationship } from './Relationship';
import { User } from './User';

export const connection = new Sequelize({
    ...dbConfig,
});
connection.addModels([
    Ability,
    Backstory,
    Character,
    CharacterAbility,
    Invitation,
    PersonalityTrait,
    Relationship,
    User
]);

export * from './Ability';
export * from './Backstory';
export * from './Character';
export * from './CharacterAbility';
export * from './Invitation';
export * from './PersonalityTrait';
export * from './Relationship';
export * from './User';
