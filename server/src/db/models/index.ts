import { dbConfig } from '@config/dbConfig';
import { Sequelize } from 'sequelize-typescript';
import { Ability } from './ability';
import { Backstory } from './backstory';
import { Character } from './character';
import { CharacterAbility } from './characterAbility';
import { Invitation } from './invitation';
import { PersonalityTrait } from './personalityTrait';
import { Relationship } from './relationship';
import { User } from './user';

export const connection = new Sequelize({
    ...dbConfig,
});
connection.addModels([Ability, Backstory, Character, CharacterAbility, Invitation, PersonalityTrait, Relationship, User]);

export * from './ability';
export * from './backstory';
export * from './character';
export * from './characterAbility';
export * from './invitation';
export * from './personalityTrait';
export * from './relationship';
export * from './user';
