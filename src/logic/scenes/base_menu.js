const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Base_Menu extends Scene {
    constructor(database) {
        super("base_menu")

        this.database = database
        this.init_functions()
    }
    async init_functions(){
        this.enter((ctx) => {

            const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
              }
              const keyboard = new Keyboard(options)
              keyboard
                .add('DebugUsersQuery') // first line

            ctx.reply("welcome to menu",keyboard.draw())
        })
        this.leave((ctx) => {
          keyboar.remove('DebugUsersQuery')
          ctx.reply('good byeeee')
        })
        this.hears(/\/cancel/gi, () => {
          this.leave()
        })
        this.hears(/DebugUsersQuery/gi, (ctx) => {
          const user = this.database['User'].findAll()
          .then((users) => {
              ctx.reply(JSON.stringify(users, null, 4))
          })
        })
        this.on('message', (ctx) => {
            ctx.reply('for exit enter /cancel',keyboard.draw())
    })
    }


}


exports.Base_Menu = Base_Menu
