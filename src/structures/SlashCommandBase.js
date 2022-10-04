const {
    SlashCommandBuilder,
    CommandInteraction
} = require('discord.js');
const YoError = require('../utils/error');
const SlashCommandData = require('./SlashCommandData');
const options = {
    writable: false,
    value: false,
    enumerable: true,
};

const setValue = (val) => {let opt = Object.assign({}, options);opt.value = val;return opt};

/**
 * @typedef {Object} extras
 * @property {boolean} onlyGuilds Habilita el comando solo para sevidores
 * @property {boolean} disabled Desactiva el comando
 * @property {boolean} admin Si el comando es solo para devs
 * @property {string} category La categoría del comando
 * @property {runner} run La función del comando
 */

/**
 * Crea un slash command
 * @module
 */
class SlashCommandBase extends SlashCommandBuilder {
    /**
     * La categoría del comando
     * @type {string}
     */
    category
    /**
     * Habilita el comando solo para servidores
     * @type {boolean}
     */
    onlyGuilds
    /**
     * Desactiva el comando
     * @type {boolean}
     */
    disabled
    /**
     * Si el comando es solo para devs
     * @type {boolean}
     */
    admin
    /**
     * La función del comando
     * @callback runner
     * @param {CommandInteraction} interaction
     * @returns 
     * @type {runner}
     */
    run

    /**
     * Crea un slash command
     * @param {extras} slashInfo La información del comando
     */
    constructor({onlyGuilds = true, disabled = false, admin = true, category = "misc", run = () => {}} = {}) {
        super();

        if (typeof onlyGuilds !== 'boolean') throw new YoError(`Se esperaba como "onlyGuilds" un boolean`);
        if (typeof disabled !== "boolean") throw new YoError(`Se esperaba como "disabled" un boolean`);
        if (typeof admin !== "boolean") throw new YoError(`Se esperaba como "admin" un boolean`);
        if (typeof category !== "string" || category.length < 0) throw new YoError(`Se esperaba como "category" un string`);
        if (typeof run !== 'function') throw new YoError(`Se esperaba como "run" una function`);

        Object.defineProperties(this, {
            onlyGuilds: setValue(onlyGuilds),
            disabled: setValue(disabled),
            admin: setValue(admin),
            category: setValue(category),
            run: setValue(run)
        });
    }
}

module.exports = SlashCommandBase;