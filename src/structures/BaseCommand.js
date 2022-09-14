'use strict';
const {} = require('discord.js');
const YoError = require('../utils/error');
const CommandData = require('./CommandData');
const locales = {
    "en-US" : null,
    "en-GB" : null,
    "bg" : null,
    "zh-CN" : null,
    "zh-TW" : null,
    "hr" : null,
    "cs" : null,
    "da" : null,
    "nl" : null,
    "fi" : null,
    "fr" : null,
    "de" : null,
    "el" : null,
    "hi" : null,
    "hu" : null,
    "it" : null,
    "ja" : null,
    "ko" : null,
    "lt" : null,
    "no" : null,
    "pl" : null,
    "pt-BR" : null,
    "ro" : null,
    "ru" : null,
    "es-ES" : null,
    "sv-SE" : null,
    "th" : null,
    "tr" : null,
    "uk" : null,
    "vi" : null,
};

/**
 * @callback runner
 * @param {CommandData} data
 */

/**
 * La base de un comando
 * @module BaseCommand
 */
class BaseCommand {
    #func
    #locateNames
    #locateDescriptions
    #commandAliases
    #commandDisabled
    #superAdmin

    /**
     * @param {Object} options Las opciones del comando
     * @param {runner} [options.run] La función del comando
     * @param {locales} options.names Los nombres del comando
     * @param {locales} options.descriptions Las descripciones del comando
     * @param {string[]} [options.aliases] Los aliases del comando
     * @param {boolean} [options.disabled] Habilita o deshabilita el comando
     * @param {boolean} [options.admin] Activa o desactiva el modo super admin
     */
    constructor({run = () => {}, names = {}, descriptions = {}, aliases = [], disabled = false, admin = false} = {}) {
        if (typeof run !== 'function')
            throw new YoError(`La propiedad run debe de ser una function`);
        if (typeof names !== 'object' || Array.isArray(names))
            throw new YoError(`La propiedad names debe de ser un object`);
        if (typeof descriptions !== 'object' || Array.isArray(descriptions))
            throw new YoError(`La propiedad descriptions debe de ser un object`);
        if(!Array.isArray(aliases))
            throw new YoError(`La propiedad aliases debe de ser un array`);
        if (typeof disabled !== 'boolean')
            throw new YoError(`La propiedad disabled debe de ser un boolean`);
        if (typeof admin !== 'boolean') 
            throw new YoError(`La propiedad admin debe de ser un boolean`);

        if (Object.keys(names).length < 1) this.#commandDisabled = true;
        else this.#commandDisabled = disabled;

        this.#func = run;
        this.#locateNames = Object.assign({}, locales, names);
        this.#locateDescriptions = Object.assign({}, locales, descriptions);
        this.#commandAliases = aliases;
        this.#superAdmin = admin;
    }

    /**
     * La función del comando
     * @type {runner}
     */
    get run() {return this.#func;}

    /**
     * Los nombres del comando
     * @type {locales}
     */
    get names() {return this.#locateNames;}

    /**
     * Las descripciones del comando
     * @type {locales}
     */
    get descriptions() {return this.#locateDescriptions;}

    /**
     * Los aliases del comando
     * @type {string[]}
     */
    get aliases() {return this.#commandAliases;}

    /**
     * Habilita o deshabilita el comando
     * @type {boolean}
     */
    get disabled() {return this.#commandDisabled;}

    /**
     * Activa o desactiva el modo super admin
     * @type {boolean}
     */
    get admin() {return this.#superAdmin;}
}

module.exports = BaseCommand;
