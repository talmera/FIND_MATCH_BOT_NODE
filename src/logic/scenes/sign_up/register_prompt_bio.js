const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const IGNORE = 'نمیخواد'
const PROMPT_BIO_MESSAGE = "خوش اومدی بیویی که میخوای برای پروفایلت نمایشه داده بشه رو وارد کن"
const FALSE_INPUT_MESSAGE = 'برای خروج /cancel رو بزنید'
class Register_Prompt_Bio extends Scene {
  constructor(database) {
    super("register_prompt_bio")

    this.database = database

    this.init_functions()
  }
  async init_functions() {
    
    this.enter((ctx) => {
      console.log('register_prompt_bio.js: entering bio')
      this.keyboard
        .add(IGNORE) // first line

      ctx.reply(PROMPT_BIO_MESSAGE, this.keyboard.draw())
    })
    this.leave((ctx) => {
      console.log('register_prompt_bio.js:  leaving bio')

    })
    this.command("cancel", () => {
      this.leave()
    })

    this.hears(IGNORE, (ctx) => {
      this.database.user_by_tg_id(ctx.message.from.id.toString()).then(user => {
        ctx.session.user = user
        ctx.scene.enter('register_prompt_pic')
      })


    })
    this.on('message', (ctx) => {
      const bio = ctx.message.text

      this.database.user_by_tg_id(ctx.message.from.id.toString()).then(user => {
        ctx.session.user = user
        ctx.session.user.bio = bio.toString()
        const PROFILE_BIO_MESSAGE = ` بیو ${bio} برای شما ثبت شد`
        ctx.reply(PROFILE_BIO_MESSAGE)
        ctx.scene.enter('register_prompt_pic')
      })



    })
  }


}


exports.Register_Prompt_Bio = Register_Prompt_Bio
