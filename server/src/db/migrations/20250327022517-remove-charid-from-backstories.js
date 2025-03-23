'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return queryInterface.removeColumn('backstories', 'characterId', { transaction: t });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return queryInterface.addColumn(
        'backstories',
        'characterId',
        {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'characters',
            },
            key: 'id',
          },
        },
        { transaction: t}
      );
    });
  },
};
