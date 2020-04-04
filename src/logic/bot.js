
const Telegraf = require('telegraf')

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { leave } = Stage

const { Starter } = require("./scenes/start.js")
const { Register_Force_Gender } = require("./scenes/sign_up/register_force_gender.js")
const { Register_Force_Age } = require("./scenes/sign_up/register_force_age.js")
const { Register_Force_Province } = require("./scenes/sign_up/register_force_province.js")
const { Register_Force_Name } = require("./scenes/sign_up/register_force_name.js")
const { Base_Menu } = require("./scenes/base_menu.js")

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

        stage.register(new Starter(this.database))
        stage.register(new Register_Force_Gender(this.database))
        stage.register(new Register_Force_Age(this.database))
        stage.register(new Register_Force_Province(this.database))
        stage.register(new Register_Force_Name(this.database))
        stage.register(new Base_Menu(this.database))

        this.bot.command('start', (ctx) => ctx.scene.enter('starter'))
        this.bot.launch()
    }
    async init(){

    }
}

exports.Bot = Bot
