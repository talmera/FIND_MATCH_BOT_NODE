// const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const AGE_SAVED = "سن شما با موفقیت ثبت شد"
const SELECT_AGE = "سن خود را وارد کنید"
const FALSE_INPUT_MESSAGE = 'اشتباه سنتون رو وارد کردید برای خروج /cancel رو بزنید'
class Register_Force_Age extends Scene {
    constructor(database) {
        super("register_force_age")

        this.database = database
        this.init_functions()
        this.selected_age = ''
    }
    async init_functions(){
      console.log('register_force_age.js: entering age')
        this.enter((ctx) => {
            ctx.reply(SELECT_AGE)
        })
        this.leave((ctx) => {
          console.log('register_force_age.js: leaving age')

        })
        this.command("cancel", () => {
          this.leave()
        })
        this.on('message', (ctx) => {
          var inp = parseInt(ctx.message.text)
          if (ctx.message.text == inp && inp < 100 && inp > 0){
            // some body entered some int
            this.selected_age = inp
            ctx.session.user.age =  this.selected_age.toString()
            ctx.reply(AGE_SAVED)
            ctx.scene.enter('register_force_province')
          }else{
            ctx.reply(FALSE_INPUT_MESSAGE)
          }
    })
    }


}


exports.Register_Force_Age = Register_Force_Age
