'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatInstance = sequelize.define('ChatInstance', {
    chat_id:  {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  ChatInstance.associate = function(models) {
    ChatInstance.hasMany(models.Message, {
      foreignKey: 'chatiId',
      onDelete: 'CASCADE'
    }),
    ChatInstance.hasMany(models.Report, {
      foreignKey: 'chatiId',
      onDelete: 'CASCADE'
    }),
    ChatInstance.belongsTo(models.User, {
      foreignKey: 'starterId',
      onDelete: 'CASCADE'
    }),
    ChatInstance.belongsTo(model.User, {
      foreignKey: 'starteeId',
      onDelete: 'CASCADE'
    })
  };
  return ChatInstance;
};
