'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    comment: DataTypes.TEXT
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};