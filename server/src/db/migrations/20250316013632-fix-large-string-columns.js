'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.changeColumn(
                    'abilities',
                    'description',
                    { type: Sequelize.DataTypes.TEXT },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'backstories',
                    'backstory',
                    { type: Sequelize.DataTypes.TEXT },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'personality_traits',
                    'description',
                    { type: Sequelize.DataTypes.TEXT },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'relationships',
                    'description',
                    { type: Sequelize.DataTypes.TEXT },
                    { transaction: t }
                ),
            ]);
        });
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.changeColumn(
                    'abilities',
                    'description',
                    { type: Sequelize.DataTypes.STRING },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'backstories',
                    'backstory',
                    { type: Sequelize.DataTypes.STRING },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'personality_traits',
                    'description',
                    { type: Sequelize.DataTypes.STRING },
                    { transaction: t }
                ),
                queryInterface.changeColumn(
                    'relationships',
                    'description',
                    { type: Sequelize.DataTypes.STRING },
                    { transaction: t }
                ),
            ]);
        });
    },
};
