'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    try{
      return queryInterface.bulkInsert('ChatInstances', [
        {starterId:'-1233456',starteeId:'-123456',chat_id:'11111989998',province:'tehran',rank:'user_tokhmi',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')},
        {starterId:'-123456',starteeId:'-12424456' ,chat_id:'-98898989998',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')}
      ],
      {});
    }
    catch(err){

    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatInstances', null, {});
  }
};
