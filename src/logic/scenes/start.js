const Keyboard = require('telegraf-keyboard');
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage


class Starter extends Scene {
    constructor(database) {
        super("starter");

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
                .add('/shoroo') // second line
            // TODO : check if user already exists in data base
            ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم",keyboard.draw())




        
        })
        this.leave((ctx) => {
            ctx.reply('afarin')            
             
        })
        this.command("shoroo",(ctx) => {ctx.scene.enter('shoroo')})
        this.on('message', (ctx) => ctx.reply("کاربر عزیز خوش اومدی گویا ثبت نام کردی دکمه شرو رو بزن تا ثبت نام بکنیم"))
    }


}


exports.Starter = Starter;
