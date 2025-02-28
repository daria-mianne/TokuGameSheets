CREATE DATABASE tokusheets
-- USE tokusheets

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    displayname varchar(100),
    recoveryEmail varchar(500),
    isAdmin boolean NOT NULL,
    createdAt timestamp,
    updatedAt timestamp,
    deletedAt timestamp
)

CREATE TABLE invitations(
    id SERIAL PRIMARY KEY,
    guid varchar NOT NULL,
    invitingUserId integer references users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    createdAt timestamp,
    deletedAt timestamp,
)

CREATE TABLE backstories(
    id SERIAL PRIMARY KEY,
    backstory varchar(1000000) NOT NULL -- 1MB
)

CREATE TABLE characters(
    id SERIAL PRIMARY KEY,
    userId integer references users(id) ON UPDATE CASCADE,
    name varchar(200) NOT NULL,
    isNpc boolean NOT NULL,
    pronouns varchar(100) NOT NULL,
    backstoryId references backstories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    createdAt timestamp,
    updatedAt timestamp,
    deletedAt timestamp
)

CREATE TABLE personality_traits(
    id SERIAL PRIMARY KEY,
    characterId integer references characters(id),
    description varchar(1000) NOT NULL
)

CREATE TABLE relationships(
    id SERIAL PRIMARY KEY,
    char1Id integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    char2Id integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    valence integer, -- -1 for negative, 0 for neutral, 1 for positive
    description varchar(1000) NOT NULL
)

CREATE TYPE ability_type AS ENUM(
    'armory',
    'iconic',
    'personal',
    'team'
)

CREATE TABLE abilities_v0(
    id SERIAL PRIMARY KEY,
    adminOnly boolean NOT NULL,
    type abilityType NOT NULL,
    description varchar(10000) NOT NULL
)

CREATE TABLE character_abilities(
    characterId integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    abilityId integer references abilities_v0(id) ON UPDATE CASCADE,
    CONSTRAINT characterAbilityId PRIMARY KEY (characterId, abilityId)
)

CREATE USER postgres WITH PASSWORD 'postgres'
ALTER USER postgres WITH SUPERUSER