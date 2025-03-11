'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn(
          'abilities',
          'char1',
          { transaction: t },
        ),
        queryInterface.removeColumn(
          'abilities',
          'char2',
          { transaction: t },
        ),
        queryInterface.addColumn(
          'relationships',
          'char1',
          {
            type: Sequelize.DataTypes.NUMBER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'relationships',
          'char2',
          {
            type: Sequelize.DataTypes.NUMBER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
    ])});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn(
          'relationships',
          'char1',
          { transaction: t },
        ),
        queryInterface.removeColumn(
          'relationships',
          'char2',
          { transaction: t },
        ),
        queryInterface.addColumn(
          'abilities',
          'char1',
          {
            type: Sequelize.DataTypes.NUMBER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'abilities',
          'char2',
          {
            type: Sequelize.DataTypes.NUMBER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
    ])});
  }
};
