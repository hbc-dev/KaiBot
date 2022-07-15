const { readdirSync } = require("fs"),
  { resolve } = require("path");

/**
 * @function commandHandler For load all commands in "src/commands" dir
 * @param {object} client The provided discord client
 */
module.exports = (client) => {
  let path = resolve(__dirname, '..', 'commands'),
      folders = readdirSync(path).filter(
        folder => folder !== 'Command.js'
      ),
      commands = client.commands

  for (let folder of folders) {
    let files = readdirSync(
      resolve(path, folder)
    ).filter(file => file.endsWith('.js'));

    for (let file of files) {
      let content = require(
        resolve(path, folder, file)
      )

      content.category = folder;
      commands.set(
        content.name,// command name
        content// all command properties
      )
    }
  }
};
