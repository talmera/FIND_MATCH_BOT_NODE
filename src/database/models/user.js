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
    User.hasMany(models.Message, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    }),
    User.belongsToMany(models.Report, {
      through: 'User_Report',
      as: 'ReportUsers'
    }),
    User.belongsToMany(models.Chat, {
      through: 'User_Chat',
      as: 'ChatUsers'
    })

  };
  return User;
};