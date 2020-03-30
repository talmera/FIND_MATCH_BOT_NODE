'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reason: {
        type: Sequelize.STRING
      },
      reporterId:{
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'User',
          key: 'id'
        }
      },
      reporteeId:{
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'User',
          key: 'id'
        }
      },
      chatId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'ChatIntance',
          key: 'id'
        }
      },
      chatiId:{
        type:Sequelize.STRING
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
    return queryInterface.dropTable('Reports');
  }
};
