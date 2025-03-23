'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.sequelize.transaction((t) => {
            return queryInterface.addColumn(
                'characters',
                'rangerColor',
                {
                    allowNull: true,
                    type: Sequelize.ENUM(
                        'unknown',
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'blue',
                        'purple',
                        'silver',
                        'gold'
                    ),
                },
                { transaction: t }
            );
        });
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.sequelize.transaction((t) => {
            return queryInterface.removeColumn('characters', 'rangerColor', { transaction: t });
        });
    },
};
