const Telegraf = require('telegraf')

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const { db } = require('../database/models/index.js');
// console.log(db)

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
        this.database = db;
        this.bot.catch(error => {
            console.error(`Bot error: ${error}`);
        });
    }
    async init() {
      this.bot.command('all', (ctx) => {
        console.log('db is : '+ this.database)
        this.database['User'].findAll()
        .then((users) => {
          // JSON.stringify(users, null, 4)
          ctx.reply('ehhh')
        })
      })
      this.bot.command('register', (ctx) => ctx.scene.enter('register'))
      const register = new Scene('register')
      register.enter((ctx) => {
        ctx.reply('hi please enter your age: ')
        var tempUser = {}
      })
      register.leave((ctx) => {
        this.database['User'].create({
            name: tempUser['name'],
            chatId: tempUser['chatId'],
            class: tempUser['class'],
            age: tmepUser['age'],
            province: tempUser['province']
        })
        ctx.reply('thank you bye')
      })
      register.on('text', (ctx) => {
          if (!tempUser['age']){
            tempUser['age'] = ctx['text']
            tempUser['chatId'] = ctx['chat'].id
            tempUser['name'] = ctx['message']['from'].first_name
            tempUser['class'] = 'normal'
            ctx.reply('lets enter your province')
          }
          else{
            tempUser['province'] = ctx['text']
            leave()
          }
      })
      const stage = new Stage()
      stage.command('cancel', leave())
      stage.register(register)
      this.bot.use(session())
      this.bot.use(Telegraf.log())
      this.bot.use(stage.middleware())
    }

    start() {
        this.bot.launch();
    }
}

exports.Bot = Bot;
