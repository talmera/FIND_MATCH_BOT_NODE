const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Province extends Scene {
    constructor(database) {
        super("register_force_province")
        this.keyboard = null
        this.database = database
        this.init_functions()
        this.all_provinces = [
          'mashhad',
          'tehran'
        ]
        this.selected_province = ''
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
                .add(this.all_provinces) // first line
                // .add('other') // second line

            ctx.reply("select your province",this.keyboard.draw())
        })
        this.leave((ctx) => {
          this.database['User'].update(
            {
              province: this.selected_province.toString()
            },
            {
              where: {
                tg_id: ctx.message.from.id.toString()
              }
            }
          )
          .then((result) => {
            ctx.reply('ostan tamam shod ', this.keyboard.clear())
          })
        })
        this.on('message', (ctx) => {
          if ( this.all_provinces.includes(ctx.message.text)) {
            this.selected_province = ctx.message.text
            ctx.scene.enter('register_force_name')
          }
          else{
            ctx.reply('for exit enter /cancel',this.keyboard.draw())
          }
    })
    }


}


exports.Register_Force_Province = Register_Force_Province
