'use strict';
module.exports = (sequelize, DataTypes) => {
  const Moral = sequelize.define('Moral', {
    behavior: {
      DataTypes.TEXT,
      allowNull: false
    },
    topic: {
      DataTypes.STRING,
      allowNull: true
    },
    tag: {
      DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Moral.associate = function(models) {
    // associations can be defined here
  };
  return Moral;
};
