const Keyboard = require('telegraf-keyboard');
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const WELCOME_MESSAGE = "کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم";
const REGISTER_BUTTON = "ثبت نام"
class Starter extends Scene {
    constructor(database) {
        super("starter");
        const options = {
          inline: false, // default
          duplicates: false, // default
          newline: false, // default
        };
        this.keyboard = new Keyboard(options);
        this.database = database;
        this.init_functions();
        

    }
    async init_functions(){
        this.enter((ctx) => {
          console.log("start.js: entered start scene")
          this.database.user_exist_by_tg_id(ctx.message.from.id.toString()) // SLOW_DOWN ?
          .then(user_exist => {
            console.log("start.js: user exists ? : "+user_exist)
            if (user_exist) {
              ctx.scene.enter('base_menu')
            } else {

              this.keyboard
              .add(REGISTER_BUTTON) // second line
              ctx.reply(WELCOME_MESSAGE,this.keyboard.draw())
            }
          })
        })
        this.leave((ctx) => {
            
            console.log("start.js: leaving start scene")
        })
        this.hears(REGISTER_BUTTON,(ctx) => {
          this.keyboard.remove(REGISTER_BUTTON)
          // adding user to data base
          ctx.session.user = this.database['User'].build({
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
        this.on('message', (ctx) => ctx.reply(WELCOME_MESSAGE))
    }


}


exports.Starter = Starter;
//change