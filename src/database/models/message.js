'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sender_id: {
      DataTypes.INTEGER,
      allowNull: false
    },
    reciever_id: {
      DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
