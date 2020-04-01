// const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Age extends Scene {
    constructor(database) {
        super("register_force_age")

        this.database = database
        this.init_functions()
        this.selected_age = ''
    }
    async init_functions(){
        this.enter((ctx) => {
            ctx.reply("enter your age")
        })
        this.leave((ctx) => {
          this.database['User'].update(
            {
              age: this.selected_age.toString()
            },
            {
              where: {
                tg_id: ctx.message.from.id.toString()
              }
            }
          )
          .then((result) => {
            ctx.reply('age sabt shod ')
          })
        })
        this.on('message', (ctx) => {
          var inp = parseInt(ctx.message.text)
          if (ctx.message.text == inp && inp < 100 && inp > 0){
            // some body entered some int
            this.selected_age = inp
            ctx.scene.enter('register_force_province')
          }else{
            ctx.reply('false input or for exit enter /cancel',)
          }
    })
    }


}


exports.Register_Force_Age = Register_Force_Age
