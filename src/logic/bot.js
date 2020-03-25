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
        this.tempUser = {}
    }
    async init() {
      this.signIn = new Scene('signIn')
      this.left = new Scene('left')
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
        this.tempUser = {}
      })
      this.signIn.leave((ctx) => {
        console.log('adding to database')
        this.database['User'].create({
            name: this.tempUser['name'],
            chatId: this.tempUser['chatId'],
            class: this.tempUser['class'],
            age: this.tempUser['age'],
            province: this.tempUser['province']
        })
        ctx.reply('thank you bye')
      })
      this.signIn.on('text', (ctx) => {
          // console.log('temp user is: ', this.tempUser)
          if (!this.tempUser['age']){
            // console.log('this is age enterred by user: ', ctx.text)
            this.tempUser['age'] = ctx['message'].text
            this.tempUser['chatId'] = ctx['chat'].id
            this.tempUser['name'] = ctx['message']['from'].first_name
            this.tempUser['class'] = 'normal'
            ctx.reply('lets enter your province')
          }
          else{
            // console.log('leaving the scene')
            this.tempUser['province'] = ctx['message'].text
            this.signIn.leave(ctx)
            ctx.scene.enter('left')
          }
      })
      this.left.enter(() => leave())
    }

    start() {
        const stage = new Stage()
        this.bot.use(session())
        this.bot.use(Telegraf.log())
        this.bot.use(stage.middleware())
        stage.command('cancel', leave())
        stage.register(this.signIn)
        stage.register(this.left)
        this.bot.command('register', (ctx) => ctx.scene.enter('signIn'))
        this.bot.launch()
    }
}

exports.Bot = Bot
