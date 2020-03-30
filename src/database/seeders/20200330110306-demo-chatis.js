'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('ChatInstances', [
        // {starterId:'2',starteeId:'3',chat_id:'11111989998', updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')},
        // {starterId:'2',starteeId:'15' ,chat_id:'-98898989998',  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') , createdAt: Sequelize.literal('CURRENT_TIMESTAMP')}
      ],
      {


      }).then((result) => {
        console.log("result tokhmi : "+result)
      }).catch((err) => {
        console.log("error tokhmi : "+err)
      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatInstances', null, {});
  }
};
