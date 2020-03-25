const Telegraf = require('telegraf')

const session = require('telegraf/session')
const Statge = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const { db } = require('../database/models/index.js');


class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
        this.database = db;
        this.bot.catch(error => {
            console.error(`Bot error: ${error}`);
        });
    }

    async init() {
      this.bot.command('register', (ctx) => ctx.scene.enter('register'))

    }

    start() {
        this.bot.startPolling();
    }
}

exports.Bot = Bot;
