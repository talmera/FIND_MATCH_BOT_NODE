
const { db } = require('./models/index.js')

class Database{

    async init(){
        this.db_file = db;
    }
// db functions here

}

exports.Database = Database;