const { sep, join } = require("path");
const { readdirSync } = require("fs");

/**
 * Datos de los eventos escuchados
 * @typedef listening
 * @property {string} name El nombre del evento
 * @property {string} reason La razón del porqué no se está escuchando
 */

/**
 * Datos de los eventos no escuchados
 * @typedef isolated
 * @property {string} name El nombre del evento
 * @property {string} mode El modo de escucha
 */

/**
 * Datos extra de retorno
 * @typedef {object} returns
 * @property {listening[]} listening El número de eventos escuchados
 * @property {isolated[]} isolated El número de eventos no escuchados
 */

/**
 * Cargador de comandos automático
 * @param {object} client El cliente de Discord
 * @returns {returns} Datos extra de retorno
 */

module.exports = (client) => {
    let path = join(__dirname, '../events');
    let listening = [];
    let isolated = [];

    for (let event of readdirSync(path).filter(file => file.endsWith('.js'))) {
        let eventData = join(path, event);
        let {alwaysListen, disabled, execute} = require(eventData);
        let name = event.slice(0, event.length - 3);

        if (disabled) {
            isolated.push({
                reason: 'Evento deshabilidato',
                name: name
            });
            
            continue;
        }

        if (!execute) {
            isolated.push({
                reason: 'No desarrollado',
                name: name
            });
            
            continue;
        }

        if (alwaysListen) {
            client.on(name, (...args) => execute(client, ...args))
            listening.push({
               mode: 'Siempre en escucha',
               name: name,
            });
        } else {
            client.once(name, (...args) => execute(client, ...args))
            listening.push({
              mode: "Unica escucha",
              name: name,
            });
        };
    };

    console.log(
        chalk.greenBright(`Se estan escuchando actualmente ${chalk.bold(listening.length)} eventos`)
    );

    if (listening.length > 0) console.log(
        `Lista de los eventos escuchados actualmente: 
        ${listening.map(event => chalk.italic('\n'+event.name+' | '+event.mode)).join('')}\n`
    );

    console.log(
        chalk.redBright(`Un total de ${isolated.length} eventos no se estan escuchando`)
    );

    if (isolated.length > 0) console.log(
        `Lista de los eventos no escuchados:
        ${isolated.map(event => chalk.italic('\n'+event.name+' | '+event.reason)).join('')}\n`
    );

    return {
        listening,
        isolated
    }
};
