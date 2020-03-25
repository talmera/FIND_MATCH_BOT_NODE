'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    chatId: {type: DataTypes.STRING, unique: true},
    class: DataTypes.STRING,
    age: DataTypes.STRING,
    province: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
