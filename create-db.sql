CREATE DATABASE tokusheets
-- USE tokusheets

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    displayname varchar(100),
    recovery_email varchar(500),
    is_admin boolean,
    created_at timestamp,
    deleted_at timestamp
)

CREATE TABLE invitations(
    id SERIAL PRIMARY KEY,
    guid varchar,
    inviting_user_id integer references users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at timestamp,
    deleted_at timestamp,
)

CREATE TABLE backstories(
    id SERIAL PRIMARY KEY,
    backstory varchar(1000000000) -- 1MB
)

CREATE TABLE characters(
    id SERIAL PRIMARY KEY,
    user_id integer references users(id) ON UPDATE CASCADE,
    name varchar(200),
    is_npc boolean,
    pronouns varchar(100),
    backstory_id references backstories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at timestamp,
    deleted_at timestamp
)

CREATE TABLE personality_traits(
    id SERIAL PRIMARY KEY,
    character_id integer references characters(id),
    description varchar(1000)
)

CREATE TABLE relationships(
    id SERIAL PRIMARY KEY,
    char_1_id integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    char_2_id integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    valence integer, -- -1 for negative, 0 for neutral, 1 for positive
    description varchar()
)

CREATE TYPE ability_type AS ENUM(
    'armory',
    'iconic',
    'personal',
    'team'
)

CREATE TABLE abilities_v0(
    id SERIAL PRIMARY KEY,
    admin_only boolean,
    type ability_type,
    description varchar(10000)
)

CREATE TABLE character_abilities(
    character_id integer references characters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    ability_id integer references abilities_v0(id) ON UPDATE CASCADE,
    CONSTRAINT character_ability_id PRIMARY KEY (character_id, ability_id)
)

CREATE USER postgres WITH PASSWORD 'postgres'
ALTER USER postgres WITH SUPERUSER