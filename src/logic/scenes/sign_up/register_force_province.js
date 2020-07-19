const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const { leave } = Stage


const SELECT_PROVINCE_MESSAGE = "استان زندگی خودتون رو وارد کنین"
const PROVINCE_SAVED = 'استان انتخابی شما ثبت شد';
const FALSE_INPUT_MESSAGE = 'for exit enter /cancel';
const PROVINCES = [
  'تهران',
  'خراسان رضوی',
  'خراسان جنوبی'
]
class Register_Force_Province extends Scene {
  constructor(database) {
    super("register_force_province")

    this.database = database
    this.init_functions()
    this.selected_province = ''
  }
  async init_functions() {
    this.enter((ctx) => {
      console.log('register_force_province.js: entering province')
      this.keyboard_buttons = [];

      if (PROVINCES.length > 3){
        for (var i = 0; i < PROVINCES.length; i ++){
          if (i + 2 < PROVINCES.length){
            this.keyboard_buttons.push([
              PROVINCES[i], PROVINCES[i + 1], PROVINCES[i+2]
            ])
            i = i + 2
          } else if (i + 1 < PROVINCES.length){

            this.keyboard_buttons.push([
              PROVINCES[i], PROVINCES[i + 1]
            ])

            i = i + 1
          } else {
            this.keyboard_buttons.push([
              PROVINCES[i]
            ])
          }
        }
      } else {
        this.keyboard_buttons.push(
          PROVINCES
        )
      }

      this.keyboard = Markup
      .keyboard(this.keyboard_buttons)
      .oneTime()
      .resize()
      .extra();
      ctx.reply(SELECT_PROVINCE_MESSAGE, this.keyboard)
    })
    this.leave((ctx) => {
      console.log('register_force_province.js: leaving province')

    })
    this.command("cancel", () => {
      this.leave()
    })
    this.on('message', (ctx) => {
      if (PROVINCES.includes(ctx.message.text)) {
        this.selected_province = ctx.message.text
        ctx.session.user.province = this.selected_province.toString()
        ctx.reply(PROVINCE_SAVED, Markup.removeKeyboard().extra())
        ctx.scene.enter('register_force_name')
      }
      else {
        ctx.reply(FALSE_INPUT_MESSAGE, this.keyboard)
      }
    })
  }


}


exports.Register_Force_Province = Register_Force_Province
