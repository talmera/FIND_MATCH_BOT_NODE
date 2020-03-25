const Telegraf = require('telegraf')

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const { db } = require('../database/models/index.js')
// console.log(db)

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token)
        this.database = db
        this.bot.catch(error => {
            console.error(`Bot error: ${error.stack}`)
        })
    }
    async init() {
      this.signIn = new Scene('signIn')
      this.bot.command('hello', (ctx) => ctx.reply('hello back'))
      this.bot.command('all', (ctx) => {
        // console.log('db is : '+ this.database)
        this.database['User'].findAll()
        .then((users) => {
          ctx.reply(JSON.stringify(users, null, 4))
        })
      })
      
      this.signIn.enter((ctx) => {
        ctx.reply('hi please enter your age: ')
        var tempUser = {}
      })
      this.signIn.leave((ctx) => {
        this.database['User'].create({
            name: tempUser['name'],
            chatId: tempUser['chatId'],
            class: tempUser['class'],
            age: tmepUser['age'],
            province: tempUser['province']
        })
        ctx.reply('thank you bye')
      })
      this.signIn.on('text', (ctx) => {
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
    }

    start() {
        const stage = new Stage()
        this.bot.use(session())
        this.bot.use(Telegraf.log())
        this.bot.use(stage.middleware())
        stage.command('cancel', leave())
        stage.register(this.signIn)
        this.bot.command('register', (ctx) => ctx.scene.enter('signIn'))
        this.bot.launch()
    }
}

exports.Bot = Bot
