import { Dialect } from 'sequelize';

export const dbConfig = {
    database: 'tokusheets',
    username: 'postgres',
    password: 'postgres',
    host: 'db',
    port: 5432,
    dialect: 'postgres' as Dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
