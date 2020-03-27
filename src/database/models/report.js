'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reason: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    Report.belongsToMany(models.User, {
      through: 'User_Report',
      as: 'Report'
    })

  Report.belongsTo(models.ChatInstance);
};
  return Report;
};