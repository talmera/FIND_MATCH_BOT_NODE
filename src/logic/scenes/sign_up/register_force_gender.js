const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const { leave } = Stage
const SELECT_GENDER_MESSAGE = "جنسیت خود را وارد کنید";
const GENDER_SAVED_MESSAGE = 'جنسیت شما با موفقیت ثبت شد';
const ASK_FOR_CANCEL = 'for exit enter /cancel'
const GIRL = 'دختر';
const BOY = 'پسر';

class Register_Force_Gender extends Scene {
    constructor(database) {
        super("register_force_gender")
        this.database = database

        this.init_functions()

    }
    async init_functions(){
        this.enter((ctx) => {
          console.log('register_force_gender.js: entering gender')


            ctx.reply(SELECT_GENDER_MESSAGE,Markup
              .keyboard([
                [BOY],[GIRL] 
              ])
              .oneTime()
              .resize()
              .extra()
      )
        })
        this.leave((ctx) => {
          console.log('register_force_gender.js: exiting gender')

          
        })
        this.hears(new RegExp((BOY + "|"+ GIRL),"g"), (ctx) => {
          this.selected_gender = ctx.message.text; 
          this.save_gender(ctx).then(()=>{
            ctx.scene.enter('register_force_age')
          })
          
        });
        this.command("cancel", () => {
          this.leave()
        });
        
        this.on('message', (ctx,next) => {
            ctx.reply(ASK_FOR_CANCEL)
           
        });
    }
    async save_gender(ctx){
      ctx.session.user.sex = this.selected_gender.toString()
      ctx.reply(GENDER_SAVED_MESSAGE , Markup.removeKeyboard().extra())
    }
}


exports.Register_Force_Gender = Register_Force_Gender
