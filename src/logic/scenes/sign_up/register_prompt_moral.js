const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const IGNORE = 'نمیخواد'
const PROMPT_MORAL_MESSAGE = "اخلاقت چیه"
const FALSE_INPUT_MESSAGE = 'برای خروج /cancel رو بزنید'
class Register_Prompt_Moral extends Scene {
    constructor(database) {
        super("register_prompt_moral")

        this.database = database
        this.init_functions()
    }
    async init_functions() {
        
        this.enter((ctx) => {
            console.log('register_prompt_moral.js: entering moral')
            this.keyboard
                .add(IGNORE) // first line

            ctx.reply(PROMPT_MORAL_MESSAGE, this.keyboard.draw())
        })
        this.leave((ctx) => {
            console.log('register_prompt_moral.js:  leaving moral')

        })
        this.command("cancel", () => {
            this.leave()
        })

        this.hears(IGNORE, (ctx) => {
            ctx.scene.enter('register_prompt_email')
        })
        this.on('message', (ctx) => {
            const moral = ctx.message.text
            ctx.session.user.moral = moral.toString()
            const PROFILE_MORAL_MESSAGE = ` اخلاق ${moral} برای شما ثبت شد`
            ctx.reply(PROFILE_MORAL_MESSAGE)
            ctx.scene.enter('register_prompt_email')
        })


    }


}


exports.Register_Prompt_Moral = Register_Prompt_Moral
