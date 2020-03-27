'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatInstance = sequelize.define('ChatInstance', {
    chat_id: DataTypes.STRING
  }, {});
  ChatInstance.associate = function(models) {
    // associations can be defined here
  };
  return ChatInstance;
};