const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {

}


const { leave } = Stage
const IGNORE = 'نمیخواد'
const PROMPT_BIO_MESSAGE = "خوش اومدی بیویی که میخوای برای پروفایلت نمایشه داده بشه رو وارد کن"
const FALSE_INPUT_MESSAGE = 'برای خروج /cancel رو بزنید'

class Chat_Request extends Scene {
  constructor(database) {
    super("chat_request")

    this.database = database
    // const options = {
    //   inline: false, // default
    //   duplicates: false, // default
    //   newline: false // default
    // }
    // this.keyboard = new Keyboard(options)
    this.init_functions()
  }
  async init_functions() {

    this.enter((ctx) => {
      console.log('chat_request.js: entering chat')
      console.log('globals are: ' , globals.online_list)
      // TODO: first
      var wait_requests = globals.online_list
      if (Object.keys(wait_requests).length > 0){
        for (var user in wait_requests){
          // // TODO: check if user matches
          ctx.session.chat_counter_party = wait_requests[user]
          ctx.reply('entering chat with user: ' + user)
          const started_chat = new MyEmitter()
          started_chat.on('message', (msg) =>{
            ctx.reply(msg)
          })
          // started_chat.on('terminate', () => {
          //   delete(started_chat)
          // })
          console.log('i have this user: ', user)
          console.log('and emiter is ', wait_requests[user])
          wait_requests[user].emit('connect', started_chat)
          ctx.scene.enter('opened_chat')
          break
        }
      }
      else {
        ctx.reply('lobby is empty please wait')
        // make a event
        const listen_from_lobby = new MyEmitter()
        listen_from_lobby.once('connect', (chat_pointer) => {
          // save user id and go to start chat with that user
          delete(globals.online_list[ctx.session.user.tg_id])
          ctx.session.chat_counter_party = chat_pointer
          listen_from_lobby.on('message', msg => {
            ctx.reply(msg)
          })
          // listen_from_lobby.on('terminate', () => {
          //   delte(listen_from_lobby)
          // })
          ctx.scene.enter('opened_chat')
        })
        // add him to globals
        globals.online_list[ctx.session.user.tg_id] = listen_from_lobby
      }
      console.log('globals are: ' , globals.online_list)
    })
    this.leave((ctx) => {
      console.log('chat_request.js:  leaving chat')
      // delete(globals.online_list[ctx.session.user.tg_id])

    })
    this.command("cancel", () => {
      this.leave()
    })

    // this.on('message', (ctx) => {
    // })
  }


}


exports.Chat_Request = Chat_Request
