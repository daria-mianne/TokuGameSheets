import dbConfig from '@db/config/dbConfig';
import { Sequelize } from 'sequelize';

export const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        ...dbConfig.pool
    },
});

export * from './ability';
export * from './backstory';
export * from './character';
export * from './characterAbility';
export * from './invitation';
export * from './personalityTrait';
export * from './relationship';
export * from './user';
