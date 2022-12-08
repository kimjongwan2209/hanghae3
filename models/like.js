'use strict'

const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class like extends Model{
    static associate(models){
      this.belongsTo(models,member,{foreignKey: "userId", targetkey:"id"});
      this.belongsTo(models.post,{foreignKey:"userId", targetkey:"id"});
    }
  }  
  like.init(
    {}, 
    {
      sequelize, 
      modelName:'like',
    });
  return like,
};