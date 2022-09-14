const {existsSync, writeFileSync, appendFileSync, mkdirSync} = require('fs'),
    {resolve} = require('path')

/**
 * @function writeLog For write a new log in a .log file
 * @param {String} log The log to write
 * @returns {Object} The confirm message
 */

function writeLog(log) {
    let logsFolder = resolve(__dirname, '..', '..', 'logs');

    if (!existsSync(logsFolder)) mkdirSync(logsFolder)

    let time = new Date().toLocaleDateString('es-ES').replace(/\//gm, '-'),
        defaultFile = time+'.log',
        file = resolve(logsFolder, defaultFile);

    if (!existsSync(file)) writeFileSync(file, log + "\n\n\n");
    else appendFileSync(file, log + "\n\n\n");
}

module.exports = writeLog;