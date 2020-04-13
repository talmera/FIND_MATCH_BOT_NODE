const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const COMPLETE_REGISTERATION_BTN_TEXT = "تکمیل ثبت نام"
const WELCOME_TO_MAINMANU_MESSAGE = "به منو اصلی خوش آمدید"

class Base_Menu extends Scene {
  constructor(database) {
    super("base_menu")

    this.database = database
    const options = {
      inline: false, // default
      duplicates: false, // default
      newline: false, // default
    }
    this.keyboard = new Keyboard(options)
    this.keyboard
      .add(COMPLETE_REGISTERATION_BTN_TEXT)
      .add('DebugUsersQuery')

    this.init_functions()
  }
  async init_functions() {
    this.enter((ctx) => {
      ctx.reply(WELCOME_TO_MAINMANU_MESSAGE, this.keyboard.draw())
    })
    this.leave((ctx) => {
      this.keyboard.remove('DebugUsersQuery')
      ctx.reply('good byeeee')
    })
    this.command("cancel", () => {
      this.leave()
    })
    this.hears(/DebugUsersQuery/gi, (ctx) => {
      ctx.session.user = this.database['User'].findAll()
        .then((users) => {
          ctx.reply(JSON.stringify(users, null, 4))
        })
    })
    this.hears(new RegExp(COMPLETE_REGISTERATION_BTN_TEXT , "i"), (ctx) => {
      ctx.scene.enter('register_prompt_bio')
    })
    this.on('message', (ctx) => {
      ctx.reply(WELCOME_TO_MAINMANU_MESSAGE, this.keyboard.draw())
    })
    
  }


}


exports.Base_Menu = Base_Menu
