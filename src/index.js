require('dotenv').config({
    path: './.env'
});

const getErrorInfo = require('./functions/system/getErrorInfo.js'),
    writeLog = require('./functions/system/writeLog.js')

globalThis.chalk = require("chalk");// for logs with colors!

const { Client, Collection } = require("discord.js"),
  client = new Client({
    intents: 32767,
    partials: ['CHANNEL']
});

client.commands = new Collection();
client.languages = new Collection();

const commandHandler = require('./handlers/commands.js'),
    eventHandler = require('./handlers/events.js'),
    languageHandler = require('./handlers/languages.js');



process.once("uncaughtException", (error) => {
    let formattedError = getErrorInfo(error)

    console.log(formattedError.console);
    writeLog(formattedError.log)
});

eventHandler(client)// => load and execute events!
languageHandler(client)// => load all languages!
commandHandler(client)// => load commands!
client.login(process.env.TOKEN);


