'use strict';
// const Sequelize = require('sequelize');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {name:'sikim' , last_name:'khiari', tg_id:'-1233456',chat_id:'11111989998',province:'tehran',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')},
      {name:'ahmad' , last_name:'mola', tg_id:'-123456',chat_id:'-98898989998',province:'sk',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')},
      {name:'miram' , last_name:'kiri', tg_id:'555456',chat_id:'+324983274',province:'nk',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')}
    ],
    {}).then((result) => {
      console.log("result tokhmi : "+result)
    }).catch((err) => {
      console.log("error tokhmi : "+err)
    });
;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
