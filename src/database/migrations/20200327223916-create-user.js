'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tg_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      chat_id: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      province: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.CHAR(40)
      },
      age: {
        allowNull: true,
        type: Sequelize.CHAR(4)
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      profile_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      profile_pic_addr: {
        allowNull: true,
        type: Sequelize.STRING
      },
      moral: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rank: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sex: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email:{
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
