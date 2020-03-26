'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserName = sequelize.define('UserName', {
    user_name: {
      DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  UserName.associate = function(models) {
    // associations can be defined here
  };
  return UserName;
};
