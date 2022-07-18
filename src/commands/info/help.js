const {
  MessageSelectMenu,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

const getCommandsInfo = require('../../functions/info/getCommands.js')
const listenHelpComponents = require('../../functions/info/listenHelpComponents.js')

/**
 * @function execute The executable
 * @param {Object} channel The Discord Channel
 * @param {Object} author The provided author
 * @param {Object} client The provided Discord Client
 * @param {Object} language The provided language
 * @param {string} prefix The provided prefixs
 */

module.exports = {
  name: "help",
  alias: ["ayuda"],
  admin: true,
  disable: false,
  enableDM: false,
  execute: ({ channel, author, client, language, prefix }) => {
    const componentCollection = new MessageActionRow();
    const selectMenu = new MessageSelectMenu()
    const next = new MessageButton();
    const previous = new MessageButton();
    const text = language.help;
    const textComponents = text.components;
    const textEmbeds = text.embeds;
    const textImages = text.files;
    const allBooks = getCommandsInfo({commands: client.commands, language: language, prefix: prefix});

    next.setCustomId("NEXT");
    next.setEmoji("▶");
    next.setStyle("PRIMARY");
    next.setDisabled(true);
    previous.setCustomId("PREV");
    previous.setEmoji("◀");
    previous.setStyle("PRIMARY");
    previous.setDisabled(true);

    selectMenu.addOptions(textComponents.selectMenu);
    selectMenu.setCustomId('HELP_SELECT_MENU');
    componentCollection.addComponents(selectMenu);
    allBooks.home = {
      file: textImages.home,
      embed: textEmbeds.home
    }

    channel.send({
      components: [componentCollection],
      embeds: textEmbeds.home,
      files: textImages.home
    }).then(async message => {
      let filter = interaction => interaction.customId == 'HELP_SELECT_MENU' &&
                   interaction.user.id == author.id;
      
      let clickedComponent = await message.createMessageComponentCollector({
        filter,
        idle: 20 * 10 ** 3,
        time: 6 * 10 ** 4
      });

      listenHelpComponents({collector: clickedComponent, books: allBooks, message, selectMenu: componentCollection});
    });
  },
};
