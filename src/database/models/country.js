'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
    Country.hasMany(models.Location, {
      foreignKey: 'CountryId',
      onDelete: 'CASCADE'
    })
  };
  return Country;
};
