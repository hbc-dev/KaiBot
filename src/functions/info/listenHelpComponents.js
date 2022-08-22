/** 
* @function listenHelpComponents
* @param {object} collector The provided collector for manage this 
* @param {object} books The provided books for send them
*/

const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

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
                new ActionRowBuilder().addComponents([
                  new ButtonBuilder()
                    .setLabel("ola")
                    .setCustomId("x")
                    .setStyle("PRIMARY"),
                  new ButtonBuilder()
                    .setLabel("test")
                    .setCustomId("xd")
                    .setStyle("SECONDARY"),
                  new ButtonBuilder()
                    .setLabel("test")
                    .setCustomId("aaa")
                    .setStyle("DANGER"),
                  new ButtonBuilder()
                    .setLabel("test")
                    .setCustomId("awdaw")
                    .setStyle("SUCCESS"),
                  new ButtonBuilder()
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