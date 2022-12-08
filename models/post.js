'use strict'

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model{
    static associate(models){
      this.belongsTo(models.member, {foreignKey: "userId", sourceKey: "id",});
      this.hasMany(models.Comment, {foreignKey: "postId", sourceKey: "id",});
      this.hasMany(models.like, {foreignKey: "postId", sourceKey: "id",});
    }
  }  
  member.init(
    {
      title: DataTypes.STRING,
      contents: DataTypes.STRING,
    }, 
    {
      sequelize, 
      modelName:'member',
    });
  return like,
};