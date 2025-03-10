'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.sequelize.transaction((t) => {
            return queryInterface.addColumn(
                'users',
                'password',
                {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                },
                { transaction: t }
            );
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return queryInterface.removeColumn('users', 'password', { transaction: t });
        });
    },
};
