'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("post", {
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
      title: {
       type: Sequelize.STRING(100),
       allowNull: false,
     },
      main: {
       type: Sequelize.STRING(1000),
       allowNull: false,
    },
      like_id: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
   });
 },

 async down (queryInterface, Sequelize) {
   queryInterface.dropTable("post");
 }
};
