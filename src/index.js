require('dotenv').config({
    path: './.env'
});

const getErrorInfo = require('./functions/system/getErrorInfo.js'),
    writeLog = require('./functions/system/writeLog.js')

globalThis.chalk = require("chalk");// for logs with colors!


const {Client, Collection} = require('discord.js'),
    client = new Client({intents: 32767});

client.commands = new Collection();

const commandHandler = require('./handlers/commands.js'),
    eventHandler = require('./handlers/events.js');

eventHandler(client)// => load and execute events!
commandHandler(client)// => load commands!

process.once("uncaughtException", (error) => {
    let formattedError = getErrorInfo(error)

    console.log(formattedError.console);
    writeLog(formattedError.log)
});

client.login(process.env.TOKEN);


