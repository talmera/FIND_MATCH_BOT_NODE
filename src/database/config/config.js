require('dotenv').config()
console.log('hello config is runnign')
console.log('Dev url : '+ process.env.DEV_DATABASE_URL)
console.log('Test url : '+ process.env.TEST_DATABASE_URL)
console.log('DataBase url : '+ process.env.DATABASE_URL)

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}
