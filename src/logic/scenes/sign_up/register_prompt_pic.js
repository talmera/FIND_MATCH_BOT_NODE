const Keyboard = require('telegraf-keyboard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const axios = require('axios')
const fs = require('fs');
const { leave } = Stage
const IGNORE = 'نمیخواد'
const PICTURE_SAVED_MESSAGE = "تصویر ارسالی شما ذخیره شد"
const PROMPT_PIC_MESSAGE = "اگه  میخوای برای پروفایلت یه عکس بفرست"
const FALSE_INPUT_MESSAGE = 'برای خروج /cancel رو بزنید'
class Register_Prompt_Pic extends Scene {
    constructor(database) {
        super("register_prompt_pic")

        this.database = database
        const options = {
            inline: false, // default
            duplicates: false, // default
            newline: false // default
        }
        this.keyboard = new Keyboard(options)
        this.init_functions()
    }
    async init_functions() {

        this.enter((ctx) => {
            console.log('register_prompt_pic.js: entering pic')
            this.keyboard
                .add(IGNORE) // first line

            ctx.reply(PROMPT_PIC_MESSAGE, this.keyboard.draw())
        })
        this.leave((ctx) => {
            console.log('register_prompt_pic.js:  leaving pic')

        })
        this.command("cancel", () => {
            this.leave()
        })

        this.hears(IGNORE, (ctx) => {
            ctx.scene.enter('register_prompt_moral')
        })
        this.on('photo', (ctx) => {
            const fileId = ctx.message.photo[1].file_id;
            const pic_address = ctx.update.message.from.id//TODO: more complicated address
            console.log("register_prompt_pic.js fildId is  : " + fileId)
            ctx.telegram.getFileLink(fileId).then(url => {
                console.log("register_prompt_pic.js url is : " + url)
                axios({ url, responseType: 'stream' }).then(response => {
                    return new Promise((resolve, reject) => {
                        response.data.pipe(fs.createWriteStream(`${__dirname}/${pic_address}.jpg`))
                            .on('finish', () => {
                                console.log("photo saved")
                                ctx.reply(PICTURE_SAVED_MESSAGE)
                                ctx.user.profile_pic_addr = pic_address
                                ctx.scene.enter('register_prompt_moral')
                            })
                            .on('error', e => {
                                console.log("photo save error")
                            })
                    });
                })
            })




        })
        this.on('message', (ctx) => {
            ctx.reply(FALSE_INPUT_MESSAGE)

        })
    }


}


exports.Register_Prompt_Pic = Register_Prompt_Pic
