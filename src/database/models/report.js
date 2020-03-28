'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reason:  {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reporterId:{
      type:Sequelize.STRING
    },
    reportedId:{
      type:Sequelize.STRING
    },
    chatiId:{
      type:Sequelize.STRING
    }
  }, {});
  Report.associate = function(models) {
    // Report.belongsTo(models.ChatInstance);
    // Report.belongsTo(models.User);
  
  };
  return Report;
};