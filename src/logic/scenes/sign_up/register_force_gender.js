const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Gender extends Scene {
    constructor(database) {
        super("register_force_gender")

        this.database = database
        this.init_functions()
        this.selected_gender = ''
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
                .add('boy', 'girl') // first line
                .add('other') // second line

            ctx.reply("select your gender",keyboard.draw())
        })
        this.leave((ctx) => {
          keyboar.remove('boy', 'girl', 'other')
          const user = this.database['User'].findAll({
            where: {
              tg_id: ctx.message.from.id
            }
          })
          user.update({
            sex: this.selected_gender
          })
          user.save()
          ctx.reply('gender sabt shod ')
          ctx.scene.enter('register_force_age')
          // TODO : save age in database
        })
        this.hears(/boy/gi, () => {
          this.selected_gender = 'boy'
          this.leave()
        })
        this.hears(/girl/gi, () => {
          this.selected_gender = 'girl'
          this.leave()
        })
        this.hears(/other/gi, () => {
          this.selected_gender = 'other'
          this.leave()
        })
        this.on('message', (ctx) => {
            ctx.reply('for exit enter /cancel',keyboard.draw())
    })
    }


}


exports.Register_Force_Gender = Register_Force_Gender
