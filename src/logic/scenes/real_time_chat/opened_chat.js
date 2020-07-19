const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const Scene = require('telegraf/scenes/base')

const EventEmitter = require('events');
const { CANCELLED } = require('dns');
// class MyEmitter extends EventEmitter {}

const { leave } = Stage
const END_BUTTON = 'پایان مکالمه';
class Opened_Chat extends Scene {
  constructor(database) {
    super("opened_chat")

    this.database = database

    this.end_chat_keyboard = Markup
    .keyboard([
      [END_BUTTON]
    ])
    .oneTime()
    .resize()
    .extra();
    
    this.init_functions()
  }
  async init_functions() {

    this.enter((ctx) => {

      console.log('opened_chat.js: entering chat')
    })
    this.leave((ctx) => {
      console.log('opened_chat.js:  leaving chat')

    })
    this.hears(END_BUTTON, (ctx) => {
      ctx.session.chat_counter_party.emit('terminate','end')
      delete(ctx.session.chat_counter_party)
      ctx.scene.enter('base_menu')
    })


    this.on('message', (ctx) => {
      ctx.session.chat_counter_party.emit('message', ctx.message.text)
    })
  }


}


exports.Opened_Chat = Opened_Chat
