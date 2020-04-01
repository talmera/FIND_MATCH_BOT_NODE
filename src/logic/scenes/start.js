const Keyboard = require('telegraf-keyboard');
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Starter extends Scene {
    constructor(database) {
        super("starter");

        this.database = database;
        this.init_functions();

    }
    async init_functions(){
        this.enter((ctx) => {
            // console.log('\n \n \n \ni have entered this.enter of starter ')
            // console.log('contxt is : \n ', ctx.message)
            // console.log('end of context')
            this.database['User'].findAll({
              attributes: ['tg_id'],
              where: {
                tg_id: ctx.message.from.id
              }
            })
            .then((user) => {
              // user exists so do something here
            })
            .catch((err) => {
              // user dont exists
              const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
              };
              const keyboard = new Keyboard(options);
              keyboard
              .add('/start') // second line
              // TODO : check if user already exists in data base
              ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم",keyboard.draw())
              // ctx.reply(err)
            })
        })
        this.leave((ctx) => {
            ctx.reply('afarin')
        })
        this.command("shoroo",(ctx) => {
          keyboard.remove('/start')
          ctx.scene.enter('shoroo')
        })
        this.on('message', (ctx) => ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم"))
    }


}


exports.Starter = Starter;
