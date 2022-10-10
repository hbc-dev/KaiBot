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

/**
 * @callback runner
 * @param {SlashCommandData} data
 */

/**
 * @typedef {Object} CustomClient
 * @property {Collection<string, SlashCommandBase>} slash
 */

class SlashCommandData {
    #entireInteraction
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
        // # General
        this.#clientData = client;
        this.#entireInteraction = interaction;

        // # INTERACTION DATA
        this.#guildData = interaction.guild;
        this.#channelData = interaction.channel
        this.#commandData = interaction.command;
        this.#memberData = interaction.member;
        this.#userData = interaction.member.user;

        if (interaction.isChatInputCommand()) {
            this.#commandOptions = interaction.options;

            let getter = client.slash.find(
                cmd => cmd.name == interaction.commandName &&
                cmd.internalAliases.includes(interaction.commandName)
            )

            if (!getter) {
                interaction.reply({
                    ephemeral: true,
                    content: 'El comando no está disponible, inténtalo más tarde'
                });

                throw new YoError(`NOT_FOUND`)
            }

            if (
                getter.admin &&
                !JSON.parse(process.env.ADMIN_IDS).includes(interaction.member.id)
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
                    content: 'Este comando está deshabilitado, inténtalo más tarde'
                });

                throw new YoError(`IS_DISABLED`);
            } else this.#execute = getter.run;
        }
    }

    /**
     * El cliente
     * @type {Client}
     */
    get client() {return this.#clientData;}

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