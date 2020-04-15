const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const { leave } = Stage

class Opened_Chat extends Scene {
  constructor(database) {
    super("opened_chat")

    this.database = database
    this.init_functions()
  }
  async init_functions() {

    this.enter((ctx) => {
      console.log('opened_chat.js: entering chat')
    })
    this.leave((ctx) => {
      console.log('opened_chat.js:  leaving chat')

    })
    this.command("cancel", () => {
      ctx.session.chat_counter_party.emit('message', 'your party has lefted chat')
      delete(ctx.session.chat_counter_party)
      this.leave()
    })

    this.on('message', (ctx) => {
      ctx.session.chat_counter_party.emit('message', ctx.message.text)
    })
  }


}


exports.Opened_Chat = Opened_Chat
