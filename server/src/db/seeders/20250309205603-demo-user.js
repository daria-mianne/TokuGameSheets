'use strict';
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => bcrypt.hash(password, 10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'admin',
        password: await hashPassword('Admin12!'),
        displayName: 'Demo Admin User',
        recoveryEmail: 'example@example.org',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    // Specify several attributes to ensure only deleting the demo user, not a real one
    return await queryInterface.bulkDelete('users', {
      id: 1,
      username: 'admin',
      displayName: 'Demo Admin User',
      recoveryEmail: 'example@example.org'
    });
  }
};
