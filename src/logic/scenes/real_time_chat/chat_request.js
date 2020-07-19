const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const Scene = require('telegraf/scenes/base')
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {

}


const { leave } = Stage
const IGNORE = 'نمیخواد'
const FALSE_INPUT_MESSAGE = "پیام ارسالی اشتباه!";
const WAIT_MESSAGE = 'مخاطبی یافت نشد اندکی صبر کنید';
const FOUND_CHATEE_MESSAGE = "مخاطب پیدا شد وصلتون کردم!"
const END_BUTTON = 'پایان مکالمه';
const CANCEL_BUTTON = 'لغو جستجو';
const CHATEE_LEFT_MESSAGE = 'مخاطب شما از چت خارج شد';

class Chat_Request extends Scene {
  constructor(database) {
    super("chat_request")
    this.database = database;
    this.end_chat_keyboard = Markup
      .keyboard([
        [END_BUTTON]
      ])
      .oneTime()
      .resize()
      .extra();

    
      this.cancel_chat_keyboard = Markup
      .keyboard([
        [CANCEL_BUTTON]
      ])
      .oneTime()
      .resize()
      .extra();
    this.init_functions()
  }
  async init_functions() {

    this.enter((ctx) => {
      console.log('chat_request.js: entering chat')
      console.log('globals are: ', globals.online_list)
      // TODO: first
      const wait_requests = globals.online_list
      if (Object.keys(wait_requests).length > 0) { // if chat party found
        for (var user in wait_requests) {
          // // TODO: check if user matches
          ctx.session.chat_counter_party = wait_requests[user]
          ctx.reply('entering chat with user: ' + user,this.end_chat_keyboard) // keyboard might be redundant
          ctx.telegram.sendMessage(user, FOUND_CHATEE_MESSAGE, this.end_chat_keyboard)
          const started_chat = new MyEmitter()
          started_chat.on('message', (msg) => {
            ctx.reply(msg, this.end_chat_keyboard)
          })
          started_chat.on('terminate', msg => {
            ctx.reply(CHATEE_LEFT_MESSAGE)
            ctx.scene.enter('base_menu')
          })

          console.log('i have this user: ', user)
          console.log('and emiter is ', wait_requests[user])
          wait_requests[user].emit('connect', started_chat)
          ctx.scene.enter('opened_chat')
          break
        }
      }
      else {// if chat can not be party found
        ctx.reply(WAIT_MESSAGE, this.cancel_search_keyboard)
        // make a listening event
        const listen_in_lobby = new MyEmitter()
        listen_in_lobby.once('connect', (chat_pointer) => {
          // save user id and go to start chat with that user
          delete (globals.online_list[ctx.session.user.tg_id])
          ctx.session.chat_counter_party = chat_pointer
          listen_in_lobby.on('message', msg => {
            ctx.reply(msg , this.end_chat_keyboard)
          })

          listen_in_lobby.on('terminate', msg => {
            ctx.reply(CHATEE_LEFT_MESSAGE)
            ctx.scene.enter('base_menu')
          })

          ctx.scene.enter('opened_chat')
        })
        // add him to globals
        globals.online_list[ctx.session.user.tg_id] = listen_in_lobby
      }
      console.log('globals are: ', globals.online_list)
    })
    this.leave((ctx) => {
      // delete (globals.online_list[ctx.session.user.tg_id])
      console.log('chat_request.js:  leaving chat')

    })
    this.command(END_BUTTON, () => {
      cctx.session.chat_counter_party.emit('terminate','end')
      delete(ctx.session.chat_counter_party);
      ctx.scene.enter('base_menu');
    })

    this.on('message', (ctx) => {
      ctx.reply(FALSE_INPUT_MESSAGE, this.keyboard)
    })
  }


}


exports.Chat_Request = Chat_Request
