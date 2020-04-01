const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Register_Force_Province extends Scene {
    constructor(database) {
        super("register_force_province")

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
                newline: false, // default
              }
              const keyboard = new Keyboard(options)
              keyboard
                .add(this.all_provinces) // first line
                // .add('other') // second line

            ctx.reply("select your province",keyboard.draw())
        })
        this.leave((ctx) => {
          keyboard.remove(this.all_provinces)
          const user = this.database['User'].findAll({
            where: {
              tg_id: ctx.message.from.id
            }
          })
          user.update({
            province: this.province.toString()
          })
          user.save()
          ctx.reply('province sabt shod ')
          ctx.scene.enter('register_force_name')
        })
        this.on('message', (ctx) => {
          if ( this.all_provinces.includes(ctx.message.text)) {
            this.selected_province = ctx.message.text
            this.leave()
          }
          else{
            ctx.reply('for exit enter /cancel',keyboard.draw())
          }
    })
    }


}


exports.Register_Force_Province = Register_Force_Province
