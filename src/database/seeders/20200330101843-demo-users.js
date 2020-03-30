'use strict';
// const Sequelize = require('sequelize');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {name:'sikim' , last_name:'khiari', tg_id:'-1233456',chat_id:'11111989998',province:'tehran',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')},
      {name:'ahmad' , last_name:'mola', tg_id:'-123456',chat_id:'-98898989998',province:'sk',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')}
    ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
