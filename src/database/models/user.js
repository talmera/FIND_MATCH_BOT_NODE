'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name:{
      DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      DataTypes.STRING,
      allowNull: false
    },
    // tg_uname: {
    //   DataTypes.STRING,
    //   unique: true,
    //   allowNull: true
    // },
    chatId: {
      type: DataTypes.STRING,
      unique: true
    },
    rank : {
      DataTypes.STRING,
      allowNull: false
    },
    age: {
      DataTypes.INTEGER,
      allowNull: true
    },
    province: {
      DataTypes.STRING,
      allowNull: true
    },
    // self_bio: {
    //   DataTypes.TEXT,
    //   allowNull: true
    // }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
