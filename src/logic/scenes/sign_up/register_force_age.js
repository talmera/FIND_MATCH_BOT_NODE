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
            ctx.reply("enter your age",keyboard.draw())
        })
        this.leave((ctx) => {
          const user = this.database['User'].findAll({
            where: {
              tg_id: ctx.message.from.id
            }
          })
          user.update({
            age: this.selected_age.toString()
          })
          user.save()
          ctx.reply('age sabt shod ')
          ctx.scene.enter('register_force_province')
          // TODO : save age in database
        })
        this.on('message', (ctx) => {
          var inp = parseInt(ctx.message.text)
          if (ctx.message.text == inp && inp < 100 && inp > 0){
            // some body entered some int
            this.selected_age = inp
            this.leave()
          }else{
            ctx.reply('false input or for exit enter /cancel',keyboard.draw())
          }
    })
    }


}


exports.Register_Force_Age = Register_Force_Age
