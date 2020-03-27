'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    type: DataTypes.CHAR,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User)
    Message.belongsTo(models.Chat)
  };
  return Message;
};