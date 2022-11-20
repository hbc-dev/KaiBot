const {
    SlashCommandBuilder,
} = require('discord.js');
const YoError = require('../utils/error');
const SlashCommandData = require('./SlashCommandData.js');
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
 * @property {string[]} internalAliases Los aliases internos del comando
 * @property {number} cooldown El cooldown para el comando
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
     * Aliases internos
     * @type {string[]}
     */
    internalAliases
    /**
     * La función del comando
     * @callback runner
     * @param {SlashCommandData} interaction
     * @returns 
     * @type {runner}
     */
    run
    /**
     * El cooldown para el comando
     * @type {number}
     */
    cooldown

    /**
     * Crea un slash command
     * @param {extras} slashInfo La información del comando
     */
    constructor({onlyGuilds = false, disabled = false, admin = true, category = "misc", run = () => {}, internalAliases = [], cooldown} = {}) {
        super();

        if (typeof onlyGuilds !== 'boolean') throw new YoError(`Se esperaba como "onlyGuilds" un boolean`);
        if (typeof disabled !== "boolean") throw new YoError(`Se esperaba como "disabled" un boolean`);
        if (typeof admin !== "boolean") throw new YoError(`Se esperaba como "admin" un boolean`);
        if (typeof category !== "string" || category.length < 0) throw new YoError(`Se esperaba como "category" un string`);
        if (typeof run !== 'function') throw new YoError(`Se esperaba como "run" una function`);
        if (cooldown && typeof cooldown !== 'number') throw new YoError(`Se esperaba como "cooldown" un number`);
        if (!Array.isArray(internalAliases)) throw new YoError(`Se esperaba como "internalAliases" un array`)

        Object.defineProperties(this, {
            onlyGuilds: setValue(onlyGuilds),
            disabled: setValue(disabled),
            admin: setValue(admin),
            category: setValue(category),
            run: setValue(run),
            internalAliases: setValue(internalAliases),
            cooldown: setValue(cooldown),
        });
    }
}

module.exports = SlashCommandBase;