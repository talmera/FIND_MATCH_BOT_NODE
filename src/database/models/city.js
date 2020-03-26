'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      DataTypes.STRING,
      unique: true,
    }
  }, {});
  City.associate = function(models) {
    // associations can be defined here
  };
  return City;
};
