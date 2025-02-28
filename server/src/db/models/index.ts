import dbConfig from '@db/config/dbConfig';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        ...dbConfig.pool
    },
});
