'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.User)
    Location.belongsTo(models.City)
    Location.belongsTo(models.Country)
    // Location.hasOne(models.city, {
    //   foreignKey: 'LocationId',
    //   onDelete: 'CASCADE'
    // }),
    // Location.hasOne(models.country, {
    //   foreignKey: 'LocationId',
    //   onDelete: 'CASCADE'
    // })
  };
  return Location;
};
