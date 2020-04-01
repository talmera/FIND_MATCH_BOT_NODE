
const Telegraf = require('telegraf')

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { leave } = Stage

const { GenderWaiterScene } = require("./scenes/sign_up/waiting_for_gender.js")
const { Starter } = require("./scenes/start.js")

const Database = require("./../database/models/index.js")
// console.log('bot.js is db: '+Database)
// console.log(db)

class Bot {
    constructor(token) {
        // console.log('data base is ', Database)
        this.bot = new Telegraf(token)
        this.database = Database
        this.bot.catch(error => {
            console.error(`Bot error: ${error.stack}`)
        })
        // this.tempUser = {}
    }


    start() {
        const stage = new Stage()
        this.bot.use(session())
        this.bot.use(Telegraf.log())
        this.bot.use(stage.middleware())
        stage.command('cancel', leave())
        stage.register(new GenderWaiterScene(this.database))
        stage.register(new Starter(this.database))
        this.bot.command('start', (ctx) => ctx.scene.enter('starter'))
        // this.bot.command('shoroo', (ctx) => ctx.scene.enter('shoroo'))
        this.bot.launch()
    }
    async init(){

    }
}

exports.Bot = Bot
