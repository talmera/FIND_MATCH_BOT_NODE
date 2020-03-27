'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    tg_id: DataTypes.STRING,
    chat_id: DataTypes.STRING,
    province: DataTypes.CHAR,
    city: DataTypes.CHAR,
    age: DataTypes.CHAR,
    bio: DataTypes.TEXT,
    profile_name: DataTypes.STRING,
    profile_pic_addr: DataTypes.STRING,
    moral: DataTypes.STRING,
    rank: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};