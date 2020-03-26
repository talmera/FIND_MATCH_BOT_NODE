'use strict';
module.exports = (sequelize, DataTypes) => {
  const Moral = sequelize.define('Moral', {
    behavior: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Moral.associate = function(models) {
    // associations can be defined here
    Moral.belongsTo(models.User)
  };
  return Moral;
};
