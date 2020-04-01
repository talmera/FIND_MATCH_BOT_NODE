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
            ctx.reply("enter a name to show others")
        })
        this.leave((ctx) => {
          this.database['User'].update(
            {
              profile_name: this.selected_name.toString()
            },
            {
              where: {
                tg_id: ctx.message.from.id.toString()
              }
            }
          )
          .then((result) => {
            ctx.reply('sabt tamam shod ')
          })
        })
        this.on('message', (ctx) => {
            // TODO: use regex to contorl names
            this.selected_name = ctx.message.text
            ctx.scene.enter('base_menu')
            // ctx.reply('false input or for exit enter /cancel',keyboard.draw())
    })
    }


}


exports.Register_Force_Name = Register_Force_Name
