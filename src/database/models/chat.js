'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
    Chat.hasMany(models.Message, {
      foreignKey: 'ChatId',
      onDelete: 'CASCADE'
    }),
    Chat.belongsToMany(models.User, {
      through: 'User_Chat',
      as: 'Chat'
    })
  };
  return Chat;
};
