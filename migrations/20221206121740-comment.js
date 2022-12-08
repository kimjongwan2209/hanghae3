'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("comment", {
      id: {
       type: Sequelize.INTEGER(11),
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
     },
     author: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    post_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
      text: {
       type: Sequelize.STRING(1000),
       allowNull: false,
    },
   });
 },

 async down (queryInterface, Sequelize) {
   queryInterface.dropTable("comment");
 }
};
