const Keyboard = require('telegraf-keyboard');
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class GenderWaiterScene extends Scene {
    constructor(database) {
        super("shoroo");

        this.database = database;
        this.init_functions();

    }
    async init_functions(){
        this.enter((ctx) => {

            const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
              };
              const keyboard = new Keyboard(options);
              keyboard
                .add('12_17', '18_23', '24_29') // first line
                .add('30 be bala') // second line
              


            ctx.reply("خوش اومدی کف کص بدبخت سنتو انتخاب کن",keyboard.draw())


        

        
        })
        this.leave((ctx) => {
        ctx.reply('sen sabt shod ')


        // TODO : save age in database
             
        })
        this.hears(/12_17/gi, leave())
        this.hears(/18_23/gi, leave())
        this.hears(/24_29/gi, leave())
        this.hears(/30 be bala/gi, leave())
        this.on('message', (ctx) => {

            const options = {
                inline: false, // default
                duplicates: false, // default
                newline: false, // default
            };
            const keyboard = new Keyboard(options);
            keyboard
                .add('12_17', '18_23', '24_29') // first line
                .add('30 be bala') // second line
            
      
            ctx.reply('kososher naferest , seneto beferest',keyboard.draw())
    })
    }


}


exports.GenderWaiterScene = GenderWaiterScene;
