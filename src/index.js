// #DEPENDENCIES - Todas las dependencias necesarias
const { Client, IntentsBitField, Partials, Collection } = require("discord.js");
globalThis.chalk = require('chalk')

// #SYSTEM - Todas las dependencias del sistema
const getErrorInfo = require('./utils/getErrorInfo');
const writeLog = require('./utils/writeLog');

// #HANDLERS - Todos los cargadores automáticos
const commands = require("./handlers/commands");
const events = require("./handlers/events");

const client = new Client({
  intents: [
    // #Base Messages
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildMessages,
    // #Guild
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
    // #Direct Messages
    IntentsBitField.Flags.DirectMessageReactions,
  ],
  partials: [Partials.User],
});

// #CATCHING ERRORS - Obtenermos todos los errores de aquí hacía abajo
process.on("uncaughtException", (error) => {
  let formattedError = getErrorInfo(error);

  console.log(formattedError.console);
  writeLog(formattedError.log);
});

// #MAIN - Todo el código de ejecución
client.commands = new Collection();

commands(client);
events(client);
client.login(process.env.TOKEN);