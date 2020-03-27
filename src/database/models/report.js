'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reason: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    Report.belongsTo(models.ChatInstance);
    Report.belongsTo(models.User);
  
  };
  return Report;
};