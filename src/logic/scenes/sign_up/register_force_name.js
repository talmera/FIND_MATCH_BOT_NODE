// const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Name extends Scene {
    constructor(database) {
        super("register_force_name")

        this.database = database
        this.init_functions()
        this.selected_name = ''
    }
    async init_functions(){
        this.enter((ctx) => {
            ctx.reply("enter a name to show others",keyboard.draw())
        })
        this.leave((ctx) => {
          const user = this.database['User'].findAll({
            where: {
              tg_id: ctx.message.from.id
            }
          })
          user.update({
            profile_name: this.selected_name.toString()
          })
          user.save()
          ctx.reply(' sabtnam tamam shod ')
          ctx.scene.enter('base_menu')
          // TODO : save name in database
        })
        this.on('message', (ctx) => {
            // TODO: use regex to contorl names
            this.selected_name = ctx.message.text
            this.leave()
            // ctx.reply('false input or for exit enter /cancel',keyboard.draw())
    })
    }


}


exports.Register_Force_Name = Register_Force_Name
