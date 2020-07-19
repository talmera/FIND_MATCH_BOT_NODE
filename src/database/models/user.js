'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    tg_id: DataTypes.STRING,
    chat_id: DataTypes.STRING,
    province: DataTypes.STRING,
    random_anonymous_id: DataTypes.STRING,
    city: DataTypes.CHAR(40),
    age: DataTypes.CHAR(4),
    bio: DataTypes.TEXT,
    sex: DataTypes.STRING,
    profile_name: DataTypes.STRING,
    profile_pic_addr: DataTypes.STRING,
    moral: DataTypes.STRING,
    rank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:  DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.ChatInstance, {
      foreignKey: 'starterId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.ChatInstance, {
      foreignKey: 'starteeId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.Report, {
      foreignKey: 'reporterId',
      onDelete: 'CASCADE'
    }),
    User.hasMany(models.Report, {
      foreignKey: 'reporteeId',
      onDelete: 'CASCADE'
    })

    // User.belongsToMany(User, {as: "Reporter", foreignKey: "reporterId", through: models.Report})
    // User.belongsToMany(User, {as: "Reported", foreignKey: "reportedId", through: models.Report})
    // User.belongsToMany(User, {as: "Sender", foreignKey: "senderId", through: models.Message})
    // User.belongsToMany(User, {as: "Receiver", foreignKey: "receiverId", through: models.Message})
  };
  return User;
};
