'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    type: DataTypes.CHAR,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};