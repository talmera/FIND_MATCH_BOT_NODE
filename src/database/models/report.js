'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    user_id: {
      DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      DataTypes.TEXT,
      allowNull: false
    },
    user_target_id: {
      DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};
