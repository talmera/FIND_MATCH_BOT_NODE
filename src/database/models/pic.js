'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pic = sequelize.define('Pic', {
    address: {
      DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Pic.associate = function(models) {
    // associations can be defined here
  };
  return Pic;
};
