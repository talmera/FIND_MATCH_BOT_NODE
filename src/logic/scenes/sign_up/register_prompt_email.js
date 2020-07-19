const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const PROMPT_EMAIL_MESSAGE = "حالا ایمیلت رو وارد کن"
const FALSE_INPUT_MESSAGE = 'برای خروج /cancel رو بزنید'
class Register_Prompt_Email extends Scene {
    constructor(database) {
        super("register_prompt_email")

        this.database = database

        this.email_regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "i")
        this.init_functions()
    }
    async init_functions() {

        this.enter((ctx) => {
            console.log('register_prompt_email.js: entering email')


            ctx.reply(PROMPT_EMAIL_MESSAGE)
        })
        this.leave((ctx) => {
            console.log('register_prompt_email.js:  leaving email')

        })
        this.command("cancel", (ctx) => {
            ctx.scene.enter('base_menu')
        })


        this.hears(this.email_regex, (ctx) => {

            const email_addr = ctx.message.text
            ctx.session.user.email = email_addr.toString()
            const PROFILE_EMAIL_MESSAGE = ` ایمیل  ${email_addr} برای شما ثبت شد`
            ctx.reply(PROFILE_EMAIL_MESSAGE)
            ctx.session.user.rank = "profile"
            ctx.session.user.save()// this line makes server slow

            ctx.scene.enter('base_menu')
        })
        this.on('message', (ctx, next) => {
            ctx.reply(FALSE_INPUT_MESSAGE)

        })


    }


}


exports.Register_Prompt_Email = Register_Prompt_Email
