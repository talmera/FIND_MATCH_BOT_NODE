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
          this.database.user_exist_by_tg_id(ctx.message.from.id.toString())
          .then(user_exist => {
            console.log(user_exist)
            if (user_exist) {
              ctx.scene.enter('base_menu')
            } else {
              const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
              };
              this.keyboard = new Keyboard(options);
              this.keyboard
              .add('/newRegister') // second line
              ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم",this.keyboard.draw())
            }
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
            tg_id: ctx.message.from.id.toString(),
            chat_id: ctx.message.chat.id.toString(),
            rank: 'primary'
          })
          // console.log('user is ', user)
          // console.log(typeof(user))
          // console.log('is instance of '+ user instanceof this.database['User'])
          ctx.scene.enter('register_force_gender')
        })
        this.on('message', (ctx) => ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم"))
    }


}


exports.Starter = Starter;
