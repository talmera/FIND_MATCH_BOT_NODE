'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {});
  City.associate = function(models) {
    // associations can be defined here
    // City.belongsTo(models.Location)
    City.hasMany(models.Location, {
      foreignKey: 'CityId',
      onDelete: 'CASCADE'
    })
  };

  return City;
};
