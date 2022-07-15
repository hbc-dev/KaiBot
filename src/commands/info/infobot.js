const {
  MessageSelectMenu,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageEmbed
} = require("discord.js")

const {resolve} = require('path');

/**
 * @function execute The executable
 * @param {Object} channel The Discord Channel
 * @param {Object} client The provided Discord Client
 */

module.exports = {
  name: "help",
  alias: ["ayuda"],
  admin: false,
  disable: false,
  enableDM: false,
  execute: ({ channel, client, language }) => {
    const component = new MessageActionRow();
    const selectMenu = new MessageSelectMenu()
    const image = new MessageAttachment(
      resolve(__dirname, '..', '..', 'images', 'próximamente.png'),
      'commingsoon.png'
    )
    const embed = new MessageEmbed();
    embed.setThumbnail('attachment://commingsoon.png')

    console.log(image)

    selectMenu.addOptions(language.help.components.selectMenu);
    selectMenu.setCustomId('HELP_SELECT_MENU');
    component.addComponents(selectMenu);

    channel.send({
      components: [component],
      content: "Test rápido",
      files: [image]
    });
  },
};
