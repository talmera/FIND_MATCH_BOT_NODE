'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs =  require('../config/config');


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};
console.log('config is '+config.url)
let sequelize;
if (config.url) {
  console.log('new sequelize commited : '+ config.url)
  sequelize = new Sequelize(config.url, {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  console.log('new sequelize commited : '+ config.database + ' user name: '+ config.username+ ' and password: ' + config.username)
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres'
  },{
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//test
// db['User'].create({
//   name: 'hamed sl',
//   chatId: '858585',
//   class: 'normal',
//   age: '20',
//   province: 'ramsar'
// })

// db['User'].findAll().then(users => {
//   // console.log('users is ', users)
//   console.log('all USERS ', JSON.stringify(users, null, 4))
// })

// db.createOrUpdateUsers = (UserJson) => {
//   db['User']
// }

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log('index.js had been called ')
// console.log(db)
module.exports.db = db;

//models/index.js
