const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const SELECT_GENDER_MESSAGE = "جنسیت خود را وارد کنید";
const GENDER_SAVED_MESSAGE = 'جنسیت شما به سلامتی ثبت شد';
const ASK_FOR_CANCEL = 'for exit enter /cancel'
class Register_Force_Gender extends Scene {
    constructor(database) {
        super("register_force_gender")
        // this.keyboard = null
        this.database = database

        const options = {
          inline: false, // default
          duplicates: false, // default
          newline: false // default
        }
        this.keyboard = new Keyboard(options)
        this.init_functions()
        this.selected_gender = null

    }
    async init_functions(){
        this.enter((ctx) => {
          console.log('register_force_gender.js: entering gender')
              this.keyboard
                .add('boy', 'girl') // first line
                .add('other') // second line

            ctx.reply(SELECT_GENDER_MESSAGE,this.keyboard.draw())
        })
        this.leave((ctx) => {
          console.log('register_force_gender.js: exiting gender')

          ctx.session.user.sex = this.selected_gender.toString()
          ctx.reply(GENDER_SAVED_MESSAGE,this.keyboard.clear())
        })
        this.hears(/boy/gi, (ctx) => {
          this.selected_gender = 'boy'
      
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
            ctx.reply(ASK_FOR_CANCEL)
        })
    }
}


exports.Register_Force_Gender = Register_Force_Gender
