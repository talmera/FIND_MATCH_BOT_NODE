const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const { leave } = Stage

const COMPLETE_REGISTERATION_BTN_TEXT = "تکمیل ثبت نام";
const WELCOME_TO_MAINMANU_MESSAGE = "به منو اصلی خوش آمدید";
const GET_INCOGNITO_LINK_MESSAGE = "دریافت لینک ناشناس";
const START_REAL_TIME_CHAT = "چت با ناشناس";
const REGISTERATION_COMPLETED_SUCCESSFULLY_MESSAGE = "تبریک شما عضویت کامل دریافت کردید!";


class Base_Menu extends Scene {
  constructor(database) {
    super("base_menu")

    this.database = database

    this.init_functions()
  }
  async init_functions() {
    this.enter((ctx) => {
      
      console.log("base_menu.js: entered base menu")
      this.database.user_by_tg_id(ctx.message.from.id.toString())
        .then((user) => {
          this.keyboard_buttons = [];
          ctx.session.user = user
          this.keyboard_buttons.push([START_REAL_TIME_CHAT , GET_INCOGNITO_LINK_MESSAGE] );
          this.keyboard_buttons.push(['DebugUsersQuery']);
          if (user.rank == "profile") {
            this.keyboard_buttons.push([REGISTERATION_COMPLETED_SUCCESSFULLY_MESSAGE]);

          } else if (user.rank == "primary") {
            this.keyboard_buttons.push([COMPLETE_REGISTERATION_BTN_TEXT])
          }
          this.keyboard = Markup
          .keyboard(this.keyboard_buttons)
          .oneTime()
          .resize()
          .extra();
          
          ctx.reply(WELCOME_TO_MAINMANU_MESSAGE, this.keyboard )
        }).catch((err) => {

          ctx.reply("مشکلی برای ربات پیش آمد")
          console.error("base_menu.js: system ride : " + err.stack)

        })

    })
    this.leave((ctx) => {
      console.log("base_menu.js: leaving base menu")
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
    this.hears(new RegExp(COMPLETE_REGISTERATION_BTN_TEXT, "i"), (ctx) => {

      ctx.scene.enter('register_prompt_bio')
    })
    this.hears(START_REAL_TIME_CHAT, (ctx) => {

      ctx.scene.enter('chat_request')
    })
    this.on('message', (ctx) => {
      ctx.reply(WELCOME_TO_MAINMANU_MESSAGE, this.keyboard)
    })

  }


}


exports.Base_Menu = Base_Menu
