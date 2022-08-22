const {
  SelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  AttachmentBuilder
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
    const componentCollectionMenu = new ActionRowBuilder();
    const componentCollectionButtons = new ActionRowBuilder();
    const selectMenu = new SelectMenuBuilder()
    const next = new ButtonBuilder();
    const previous = new ButtonBuilder();
    const text = language.help;
    const textComponents = text.components;
    const textEmbeds = text.embeds;
    const textImages = text.files;
    const allBooks = getCommandsInfo({commands: client.commands, language: language, prefix: prefix});

    next.setCustomId("NEXT");
    next.setEmoji("▶");
    next.setStyle("Primary");
    next.setDisabled(true);
    previous.setCustomId("PREV");
    previous.setEmoji("◀");
    previous.setStyle("Primary");
    previous.setDisabled(true);

    selectMenu.addOptions(textComponents.selectMenu);
    selectMenu.setCustomId('HELP_SELECT_MENU');
    componentCollectionMenu.addComponents(selectMenu);
    componentCollectionButtons.addComponents([previous, next]);
    allBooks.home = {
      files: textImages.home,
      embed: textEmbeds.home
    }

    return channel.send({
      content: "testeo",
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("hello").setEmoji('⚔️')
        ),
      ],
    });

    let attach = new AttachmentBuilder('src/images/soon.png', 'xd.png')
    channel.send({
      components: [componentCollectionMenu, componentCollectionButtons],
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

      listenHelpComponents({
        collector: clickedComponent,
        books: allBooks,
        components: [componentCollectionMenu, componentCollectionButtons],
        message,
      });
    });
  },
};
