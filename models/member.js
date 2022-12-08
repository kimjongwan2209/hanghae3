'use strict'

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class member extends Model{
    static associate(models){
      this.hasMany(models.Post, {foreignKey: "userId", sourceKey: "id",});
      this.hasMany(models.Comment, {foreignKey: "userId", sourceKey: "id",});
      this.hasMany(models.like, {foreignKey: "userId", sourceKey: "id",});
    }
  }  
  member.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
    }, 
    {
      sequelize, 
      modelName:'member',
    });
  return like,
};