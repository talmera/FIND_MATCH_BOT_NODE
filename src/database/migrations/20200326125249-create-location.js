'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      UserId: {
        type: sequelize.INTEGER,
        refrences: {
          model: 'User',
          key: 'id'
        }
      },
      CityId: {
        type: sequelize.INTEGER,
        refrences: {
          model: 'City',
          key: 'id'
        }
      },
      CountryId: {
        type: sequelize.INTEGER,
        refrences: {
          model: 'Country',
          key: 'id'
        }
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
    return queryInterface.dropTable('Locations');
  }
};
