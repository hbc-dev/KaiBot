/**
 * @function getErrorInfo For get extra info like error column, error line, etc
 * @param {String} stack The provided stack of the error
 * @returns {Object} All the formatted error for console and logs files
 */

function getErrorInfo(error) {
  let stack = error.stack;

  let lines = stack.match(/(?<=\.js:).*?(?=\)|$)/gm) ?? [],
    pathOfFiles = stack.match(/(?<=\(|at |).*?(?<=\.js|\.png)/gm),
    time = new Date().toLocaleTimeString("es-ES");

  let errorLines = '\n\n' + lines
  .map((line, index) => pathOfFiles[index]+' | '+line)
  .join('\n');

  let message = `${error.name}: ${error.message}`,
    premessage = `[${time}] ¡Oh, no! ocurrió un error. Error:\n`;

  return {
    log: premessage + message + errorLines,
    console: premessage + chalk.bgRed(message) + chalk.italic(errorLines),
  };
}

module.exports = getErrorInfo;