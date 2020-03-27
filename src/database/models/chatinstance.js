'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatInstance = sequelize.define('ChatInstance', {
    chat_id: DataTypes.STRING
  }, {});
  ChatInstance.associate = function(models) {
    ChatInstance.hasMany(models.Message, {
      foreignKey: 'ChatId',
      onDelete: 'CASCADE'
    }),
    ChatInstance.belongsToMany(models.User, {
      through: 'User_Chat',
      as: 'Chat'
    }),
    ChatInstance.hasMany(models.Report, {
      foreignKey: 'chatiId'
    })

  };
  return ChatInstance;
};