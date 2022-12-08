'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     queryInterface.createTable("member", {
      userId: {
        type: Sequelize.STRING(20),
        allowNull: false,        
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING(40),
        allowNull: false,
      }
    });
    return;
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("member");
  }
};


