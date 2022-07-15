const Command = require('../commands/Command.js'),
      setLanguage = require('../')

module.exports = {
  disable: false,
  name: "messageCreate",
  execute: (client, message) => {
    const prefix = process.env.PREFIX;// falta la db
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const language = client.languages.get('es');// falta la db

    const data = new Command(client, message, language, prefix),
          command = data.command;

    if (!command) return;

    if (
      command.admin &&
      !JSON.parse(process.env.ADMIN_IDS).includes(data.author.id)
      ) return;

    if (command.disable) return;
    if (data.channel.type == 'DM' && !command.enableDM) return;

    command.execute(data)
  },
};
