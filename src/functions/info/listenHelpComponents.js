/** 
* @function listenHelpComponents
* @param {object} collector The provided collector for manage this 
* @param {object} books The provided books for send them
*/

const { MessageActionRow, MessageButton } = require("discord.js");

function listenHelpComponents({collector, books, message, components}) {
    collector.on('collect', (click) => {
        let value = click?.values[0]

        if (value == 'home') {
            message.edit({
                files: books.home.file,
                embeds: books.home.embed
            });

            return click.deferUpdate();
        } else {
            let buttons = components[1].components;
            buttons.forEach((button) => button.setDisabled(false));

            message.edit({
              files: [],
              embeds: books[value].nextPage(),
              components: [
                components[1],
                components[0],
                new MessageActionRow().addComponents([
                  new MessageButton()
                    .setLabel("ola")
                    .setCustomId("x")
                    .setStyle("PRIMARY"),
                  new MessageButton()
                    .setLabel("test")
                    .setCustomId("xd")
                    .setStyle("SECONDARY"),
                  new MessageButton()
                    .setLabel("test")
                    .setCustomId("aaa")
                    .setStyle("DANGER"),
                  new MessageButton()
                    .setLabel("test")
                    .setCustomId("awdaw")
                    .setStyle("SUCCESS"),
                  new MessageButton()
                    .setLabel("test")
                    .setCustomId("LINK")
                    .setStyle("LINK")
                    .setURL('https://example.com/'),
                ]),
              ],
            });
        }

        if (click.isButton()) {
        }
    });
}

module.exports = listenHelpComponents;