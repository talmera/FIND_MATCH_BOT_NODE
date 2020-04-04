// const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const REGISTER_DONE_MESSAGE = "مراحل ثبت نام به پایان رسید"
const INPUT_PROFILE_MESSAGE = "نام کاربری خود برای پروفایل را انتخاب کنید"
class Register_Force_Name extends Scene {
    constructor(database) {
        super("register_force_name")

        this.database = database
        this.init_functions()
        this.selected_name = ''
    }
    async init_functions(){
        this.enter((ctx) => {
            ctx.reply(INPUT_PROFILE_MESSAGE)
        })
        this.leave((ctx) => {
          ctx.session.user.profile_name =  this.selected_name.toString()
          ctx.session.user.save()// this line makes server slow
          ctx.reply(REGISTER_DONE_MESSAGE)
        })

        this.on('message', (ctx) => {
            // TODO: use regex to contorl names
            this.selected_name = ctx.message.text
            ctx.scene.enter('base_menu')
            // ctx.reply('false input or for exit enter /cancel',keyboard.draw())
    })
    }


}


exports.Register_Force_Name = Register_Force_Name
