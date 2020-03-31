'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reason:  {
      type: DataTypes.TEXT,
      allowNull: false
    },
    chatiId:{
      type: DataTypes.STRING
    }
  }, {});
  Report.associate = function(models) {
    // Report.belongsTo(models.ChatInstance);
    // Report.belongsTo(models.User);
    Report.belongsTo(models.User, {
      foreignKey: 'reporterId',
      onDelete: 'CASCADE'
    }),
    Report.belongsTo(models.User, {
      foreignKey: 'reporteeId',
      onDelete: 'CASCADE'
    }),
    Report.belongsTo(models.ChatInstance, {
      foreignKey: 'chatId',
      onDelete: 'CASCADE'
    })
  };
  return Report;
};
