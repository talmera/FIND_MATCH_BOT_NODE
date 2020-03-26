'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat_id: {
      DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
    Chat.hasMany(models.Message, {
      foreignKey: 'ChatId',
      onDelete: 'CASCADE'
    })
  };
  return Chat;
};
