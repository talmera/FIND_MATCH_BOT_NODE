const Keyboard = require('telegraf-keyboard');
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Starter extends Scene {
    constructor(database) {
        super("starter");
        this.keyboard = null
        this.database = database;
        this.init_functions();

    }
    async init_functions(){
        this.enter((ctx) => {
            // console.log('\n \n \n \ni have entered this.enter of starter ')
            console.log('contxt is : \n ', ctx.message)
            // console.log('end of context')
            this.database['User'].findAll({
              attributes: ['tg_id'],
              where: {
                tg_id: ctx.message.from.id
              }
            })
            .then((user) => {
              // user exists so do something here
              ctx.scene.enter('base_menu')
            })
            .catch((err) => {
              // user dont exists
              const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
              };
              this.keyboard = new Keyboard(options);
              this.keyboard
              .add('/newRegister') // second line
              // TODO : check if user already exists in data base
              ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم",this.keyboard.draw())
              // ctx.reply(err)
            })
        })
        this.leave((ctx) => {
            // ctx.reply('afarin')
        })
        this.command("newRegister",(ctx) => {
          this.keyboard.remove('/newRegister')
          // adding user to data base
          const user = this.database['User'].create({
            name: ctx['message']['from'].first_name,
            last_name: ctx.message.from.last_name,
            tg_id: ctx.message.from.id,
            chat_id: ctx.message.chat.id,
            rank: 'primary'
          })
          ctx.scene.enter('register_force_gender')
        })
        this.on('message', (ctx) => ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم"))
    }


}


exports.Starter = Starter;
