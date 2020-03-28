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
    rank: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    }),


    User.belongsToMany(models.ChatIntance, {
      through: 'User_ChatInstance',
      as: 'Users'
    })


    User.belongsToMany(User, {as: "Reporter", foreignKey: "reporterId", through: models.Report})
    User.belongsToMany(User, {as: "Reported", foreignKey: "reportedId", through: models.Report})


    User.belongsToMany(User, {as: "Sender", foreignKey: "senderId", through: models.Message})
    User.belongsToMany(User, {as: "Receiver", foreignKey: "receiverId", through: models.Message})
  };
  return User;
};