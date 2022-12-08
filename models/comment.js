'use strict'

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model{
    static associate(models){
      this.belongsTo(models,member,{foreignKey: "userId", targetkey:"id"});
      this.belongsTo(models.post,{foreignKey:"userId", targetkey:"id"});
    }
  }  
  Comment.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName:'comment',
  });
  return comment,
};