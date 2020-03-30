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
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tg_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      chat_id: {
        type: Sequelize.STRING,
        unique: true
      },
      province: {
        type: Sequelize.CHAR
      },
      city: {
        type: Sequelize.CHAR
      },
      age: {
        type: Sequelize.CHAR
      },
      bio: {
        type: Sequelize.TEXT
      },
      profile_name: {
        type: Sequelize.STRING
      },
      profile_pic_addr: {
        type: Sequelize.STRING
      },
      moral: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
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