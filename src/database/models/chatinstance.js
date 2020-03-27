'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatInstance = sequelize.define('ChatInstance', {
    chat_id: DataTypes.STRING
  }, {});
  ChatInstance.associate = function(models) {
    ChatInstance.hasMany(models.Message, {
      foreignKey: 'chatiId',
      onDelete: 'CASCADE'
    }),
    

    ChatInstance.belongsTo(models.User, {
      as: 'Chat',
      onDelete: 'CASCADE'
    }),
    ChatInstance.hasMany(models.Report, {
      foreignKey: 'chatiId'
    })

  };
  return ChatInstance;
};