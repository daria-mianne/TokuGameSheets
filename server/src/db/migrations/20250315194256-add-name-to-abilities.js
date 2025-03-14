'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction((t) => {
      return queryInterface.addColumn(
        'abilities',
        'name',
        {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
        },
        { transaction: t }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction((t) => {
      return queryInterface.removeColumn('abilities', 'name', { transaction: t });
    });
  }
};
