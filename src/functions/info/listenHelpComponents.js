/** 
* @function listenHelpComponents
* @param {object} collector The provided collector for manage this 
* @param {object} books The provided books for send them
*/

const { MessageActionRow, MessageButton } = require("discord.js");

function listenHelpComponents({collector, books, message, selectMenu}) {
    collector.on('collect', (click) => {
        let value = click?.values[0]

        if (value == 'home') {
            message.edit({
                files: books.home.file,
                embeds: books.home.embed
            });

            return click.deferUpdate();
        } else {
            message.edit({
                files: [],
                embeds: books[value].nextPage()
            })
        }

        if (click.isButton()) {
            
        }
    });
}

module.exports = listenHelpComponents;