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
      type:Sequelize.STRING,
      allowNull: false
    },
    receiverId:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    chatiId:{
      type:Sequelize.STRING
    }
  }, {});
  Message.associate = function(models) {
    // Message.belongsTo(models.User)
    // Message.belongsTo(models.Chat)
  };
  return Message;
};