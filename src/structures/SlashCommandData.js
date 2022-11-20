const {
    ChatInputCommandInteraction,
    Client,
    Guild,
    TextChannel,
    ApplicationCommand,
    GuildMember,
    User,
    Collection
} = require("discord.js");
const YoError = require("../utils/error");
const SlashCommandBase = require('./SlashCommandBase');
const BaseCommand = require('./BaseCommand');
const { DatabaseManager } = require("sqliteplus");
const moneyClient = require('unb-api').Client;
// const i18n = require("./i18n");

/**
 * @callback runner
 * @param {SlashCommandData} data
 */

/**
 * @typedef {Object} CustomClient
 * @property {Collection<string, SlashCommandBase>} slash
 * @property {Collection<string, number>} cooldowns
 * @property {Collection<string, BaseCommand>} commands
 * @property {DatabaseManager} manager
 * @property {moneyClient} moneyAPI
 */

class SlashCommandData {
    #entireInteraction
    #userLang
    #clientData
    #channelData
    #commandData
    #guildData
    #memberData
    #userData
    #execute
    #commandOptions


    /**
     * Los datos
     * @param {CustomClient & Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    constructor(client, interaction) {
        // let translator = new i18n({ locale: account?.language ?? "es" });
        let cooldown = client.cooldowns.get(interaction.user.id+':'+interaction.commandId);

        // # General
        this.#clientData = client;
        this.#entireInteraction = interaction;
        // this.#userLang = translator.getCommandDialogues({
        //     name: interaction.commandName,
        //     type: 'slash_command',
        // });

        // # INTERACTION DATA
        this.#guildData = interaction.guild;
        this.#channelData = interaction.channel
        this.#commandData = interaction.command;
        this.#memberData = interaction.member;
        this.#userData = interaction.member.user;

        this.#commandOptions = interaction.options;

        let getter = client.slash.find(
            cmd => cmd.name == interaction.commandName ||
            Object.values(cmd.name_localizations).includes(interaction.commandName) ||
            cmd.internalAliases.includes(interaction.commandName)
        )

        if (!getter) {
            interaction.reply({
              ephemeral: true,
              content: `El comando ${interaction.commandName} no puede ser usado en este momento.`,
            });

            throw new YoError(`COMMAND_NOT_FOUND`)
        }

        if (cooldown) {
            let time = Date.now()

            if (cooldown.time > time) {
                interaction.reply({
                    ephemeral: true,
                    content: `¡No ha pasado el enfriamiento! Por favor, vuelve a intentarlo más tarde: <t:${Math.floor(cooldown.time/1000)}:R>`
                });

                throw new YoError(`COOLDOWN`)
            } else client.cooldowns.delete(interaction.user.id+':'+interaction.commandId)
        }

        if (
            getter.admin &&
            !JSON.parse(process.env.ADMIN_IDS).includes(interaction.user.id)
        ) {
            interaction.reply({
                ephemeral: true,
                content: '¡No puedes hacer uso de este comando!'
            });

            throw new YoError(`SUPER_ADMIN`);
        }

        if (getter.disabled) {
            interaction.reply({
                ephemeral: true,
                content: "Este comando está deshabilitado, inténtalo más tarde"
            });

            throw new YoError(`IS_DISABLED`);
        } else {
            this.#execute = getter.run;

            if (getter.cooldown)
            client.cooldowns.set(interaction.user.id+':'+interaction.commandId, {
                    time: Date.now()+getter.cooldown,
                    cmd: interaction.commandId,
            });
        }
    }

    /**
     * El cliente
     * @type {Client & CustomClient}
     */
    get client() {return this.#clientData;}

    // /**
    //  * El lenguaje del usuario
    //  * @type {Object<string, string>}
    //  */
    // get language() {return this.#userLang;}

    /**
     * La interacción
     * @type {ChatInputCommandInteraction}
     */
    get interaction() {return this.#entireInteraction;}

    /**
     * El servidor
     * @type {Guild}
     */
    get guild() {return this.#guildData;}

    /**
     * EL canal
     * @type {TextChannel}
     */
    get channel() {return this.#channelData;}

    /**
     * El comando
     * @type {ApplicationCommand}
     */
    get command() {return this.#commandData;}

    /**
     * El usuario
     * @type {User}
     */
    get user() {return this.#userData;}

    /**
     * El miembro
     * @type {GuildMember}
     */
    get member() {return this.#memberData}

    /**
     * El ejecutable
     * @type {runner}
     */
    get run() {return this.#execute}

    /**
     * Las opciones del comando
     */
    get cmdOptions() {return this.#commandOptions}
}

module.exports = SlashCommandData;