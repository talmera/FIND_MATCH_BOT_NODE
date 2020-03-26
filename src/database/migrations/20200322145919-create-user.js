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
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // tg_uname: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      //   unique: true
      // },
      chatId: {
        type: Sequelize.STRING,
        unique: true
      },
      rank : {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // province: {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // },
      // self_bio: {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }
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
