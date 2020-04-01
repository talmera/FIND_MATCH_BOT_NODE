const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Gender extends Scene {
    constructor(database) {
        super("register_force_gender")
        this.keyboard = null
        this.database = database
        this.init_functions()
        this.selected_gender = null
    }
    async init_functions(){
        this.enter((ctx) => {

            const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false // default
              }
              this.keyboard = new Keyboard(options)
              this.keyboard
                .add('boy', 'girl') // first line
                .add('other') // second line

            ctx.reply("select your gender",this.keyboard.draw())
        })
        this.leave((ctx) => {
          console.log('exiting gender')
          this.database['User'].update(
            {
              sex: this.selected_gender.toString()
            },
            {
              where: {
                tg_id: ctx.message.from.id.toString()
              }
            }
          )
          .then((result) => {
            ctx.reply('gender sabt shod ',this.keyboard.clear())
          })
        })
        this.hears(/boy/gi, (ctx) => {
          this.selected_gender = 'boy'
          console.log('i am boy')
          ctx.scene.enter('register_force_age')
        })
        this.hears(/girl/gi, (ctx) => {
          this.selected_gender = 'girl'
          ctx.scene.enter('register_force_age')
        })
        this.hears(/other/gi, (ctx) => {
          this.selected_gender = 'other'
          ctx.scene.enter('register_force_age')
        })
        this.on('message', (ctx) => {
            ctx.reply('for exit enter /cancel')
        })
    }
}


exports.Register_Force_Gender = Register_Force_Gender
