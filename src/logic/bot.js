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
