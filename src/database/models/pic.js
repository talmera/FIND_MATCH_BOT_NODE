'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pic = sequelize.define('Pic', {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Pic.associate = function(models) {
    // associations can be defined here
    Pic.belongsTo(models.User)
  };
  return Pic;
};
