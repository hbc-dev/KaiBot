const {sep, join} = require('path');
const {readdirSync} = require('fs');
const { Client } = require('discord.js');

/**
 * Datos extra de retorno
 * @typedef {object} returns
 * @property {number} loaded El número de comandos cargados con éxito
 * @property {string[]} unloaded Un array con los comandos no cargados
 */

/**
 * Cargador de comandos automático
 * @param {Client} client El cliente de Discord
 * @returns {returns} Datos extra de retorno
 */
module.exports = (client) => {
    let commands = client.commands;
    let path = join(__dirname, '../commands');
    let unloaded = [];
    let loaded = 0;

    for (let folder of readdirSync(path)) {
        let files = join(path, sep, folder);
        let command = join(files, sep, `${folder}.js`);

        try {
            let point = readdirSync(files).filter((file) => file == `${folder}.js`);

            if (!point) {unloaded.push(files);continue;}

            commands.set(folder, require(command));
            loaded++;
        } catch {unloaded.push(files);}
    }

    console.log(
        chalk.greenBright(`Se han cargado un total de ${chalk.bold(loaded)} comandos en memoria`)
    )

    console.log(chalk.redBright(`Un total de ${chalk.bold(unloaded.length)} comandos no han sido cargados\n\n`))

    if (unloaded.length > 0) console.log(
        `Lista de comandos no cargados:\n\n${unloaded.map(cmd => chalk.italic(cmd)+'\n').join('')}`
    );

    return {
        loaded,
        unloaded
    }
}