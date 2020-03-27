'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reason: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};