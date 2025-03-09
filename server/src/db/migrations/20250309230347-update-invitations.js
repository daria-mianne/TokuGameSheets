'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(t => {
      return queryInterface.addColumn(
        'invitations',
        'forAdmin',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        { transaction: t },
      );
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(t => {
      return queryInterface.removeColumn(
        'invitations',
        'forAdmin',
        { transaction: t },
      );
    });
  },
};
