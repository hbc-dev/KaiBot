'use strict';
const { User, Guild, TextChannel, Client, Message, GuildMember } = require("discord.js")
const YoError = require('../utils/error');
const BaseCommand = require('./BaseCommand')

/**
 * @callback runner
 * @param {CommandData} data
 */

/**
 * @typedef {Object} CustomClient
 * @property {Map<string, BaseCommand>} commands
 */

/**
 * Maneja los datos del comando recién pedido
 * @module CommandData
 */
class CommandData {
    #commandName
    #commandArguments
    #entireMessage
    #authorData
    #memberData
    #channelData
    #guildData
    #clientData
    #execute

    /**
     * @param {CustomClient & Client} client El cliente que ha escuchado al usuario
     * @param {Message} message El mensaje enviado
     */
    constructor(client, message) {
        let prefix = process.env.PREFIX
        if (message.author.bot) throw new YoError('IS_BOT')
        if (!message.content.toLowerCase().startsWith(prefix)) throw new YoError('NOT_PREFIX')

        let parser = message.content.trim().slice(prefix.length).split(' ')

        // #GENERAL
        this.#entireMessage = message;
        this.#commandName = parser.shift().toLowerCase();
        this.#commandArguments = parser;
        this.#clientData = client;

        // #RELATIVE MESSAGE
        this.#authorData = message.author;
        this.#memberData = message.member;
        this.#channelData = message.channel;
        this.#guildData = message.guild;

        let checkCommand = client.commands.find(command => 
            Object.values(command.names).includes(this.#commandName) ||
            command.aliases.includes(this.#commandName)
        );

        if (!checkCommand) throw new YoError("NOT_FOUND");

        if (
            checkCommand.admin &&
            !JSON.parse(process.env.ADMIN_IDS).includes(message.author.id)
        ) throw new YoError("SUPER_ADMIN");

        if (checkCommand.disabled) throw new YoError('IS_DISABLED')
        else this.#execute = checkCommand.run
    }

    /**
     * La función para ejecutar el comando final
     * @type {runner}
     */
    get run() {return this.#execute;}

    /**
     * El nombre del comando
     * @type {string}
     */
    get command() {return this.#commandName;}

    /**
     * Los argumentos del comando
     * @type {string}
     */
    get args() {return this.#commandArguments;}

    /**
     * El mensaje
     * @type {Message}
     */
    get message() {return this.#entireMessage}

    /**
     * El cliente que escuchó el comando
     * @interface CustomClient
     * @property {Map<string, BaseCommand>} commands
     */
    get client() {return this.#clientData;}

    /**
     * El autor del mensaje
     * @type {User}
     */
    get author() {return this.#authorData;}

    /**
     * El miembro que mandó el mensaje
     * @type {GuildMember}
     */
    get member() {return this.#memberData;}

    /**
     * El canal donde se mandó el mensaje
     * @type {TextChannel}
     */
    get channel() {return this.#channelData;}

    /**
     * El servidor donde se mandó el mensaje
     * @type {Guild}
     */
    get guild() {return this.#guildData;}

    /**
     * El lenguaje del usuario
     * @type {Object<string, any>}
     */
    get language() {return require(`../data/lang/es-ES.json`)}
}

module.exports = CommandData;