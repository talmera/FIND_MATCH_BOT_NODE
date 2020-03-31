'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    type: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    senderId:{
      type:DataTypes.STRING,
      allowNull: false
    },
    receiverId:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    chatiId:{
      type:DataTypes.STRING
    }
  }, {});
  Message.associate = function(models) {
    // Message.belongsTo(models.User)
    // Message.belongsTo(models.Chat)
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    }),
    Message.belongsTo(models.ChatInstance, {
      foreignKey: 'chatId',
      onDelete: 'CASCADE'
    })

  };
  return Message;
};
