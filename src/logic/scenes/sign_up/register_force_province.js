const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


const SELECT_PROVINCE_MESSAGE = "استان زندگی خودتون رو وارد کنین"
const PROVINCE_SAVED = 'استان انتخابی شما ثبت شد';
const FALSE_INPUT_MESSAGE = 'for exit enter /cancel';
const PROVINCES = [
  'mashhad',
  'tehran'
]
class Register_Force_Province extends Scene {
    constructor(database) {
        super("register_force_province")
        const options = {
          inline: false, // default
          duplicates: false, // default
          newline: false // default
        }
        this.keyboard = new Keyboard(options)
        this.database = database
        this.init_functions()
        this.selected_province = ''
    }
    async init_functions(){
        this.enter((ctx) => {
          console.log('register_force_province.js: entering province')
            this.keyboard
              .add(PROVINCES) // first line

            ctx.reply(SELECT_PROVINCE_MESSAGE,this.keyboard.draw())
        })
        this.leave((ctx) => {
          console.log('register_force_province.js: leaving province')

          ctx.session.province =  this.selected_province.toString()
          ctx.reply(PROVINCE_SAVED, this.keyboard.clear())

        })
        this.on('message', (ctx) => {
          if ( PROVINCES.includes(ctx.message.text)) {
            this.selected_province = ctx.message.text
            ctx.scene.enter('register_force_name')
          }
          else{
            ctx.reply(FALSE_INPUT_MESSAGE,this.keyboard.draw())
          }
    })
    }


}


exports.Register_Force_Province = Register_Force_Province
