'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatInstance = sequelize.define('ChatInstance', {
    chat_id:  {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  ChatInstance.associate = function(models) {
    ChatInstance.hasMany(models.Message, {
      foreignKey: 'chatiId',
      onDelete: 'CASCADE'
    }),
    

    ChatInstance.belongsToMany(models.User, {
      as: 'Chati',
      through: 'User_ChatInstance',
    }),
    ChatInstance.hasMany(models.Report, {
      foreignKey: 'chatiId'
    })

  };
  return ChatInstance;
};