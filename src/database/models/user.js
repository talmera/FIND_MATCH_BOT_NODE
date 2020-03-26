'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tg_uname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    chat_show_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    chatId: {
      type: DataTypes.STRING,
      unique: true
    },
    rank : {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // province: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // self_bio: {
    //   type: DataTypes.TEXT,
    //   allowNull: true
    // }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Message, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.Moral, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.Location, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.Pic, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    }),
    User.belongsToMany(models.Report, {
      through: 'User_Report',
      as: 'User'
    }),
    User.belongsToMany(models.Chat, {
      through: 'User_Chat',
      as: 'User'
    })
  };
  return User;
};
