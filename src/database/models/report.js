'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // user_target_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};
