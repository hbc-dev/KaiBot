const manualConfig = require('../../data/config.js'),
    EmbedBook = require('../embeds/EmbedBook.js'),
    {MessageEmbed} = require('discord.js');

/**
 * @function getCommandsInfo For get all the commands info and send with components
 * @param {Object} commands The commands provided by the client
 * @returns {Array} An array with objects containing the commands and the components
 */

function getCommandsInfo({commands, language, prefix}) {
    let categories = Object.keys(manualConfig.categories);
    let allBooks = {};

    for (let category of categories) {
        let commandCollection = commands.filter(
            command => command.category === category
        );
        
        allBooks[category] = new EmbedBook();
        allBooks[category].addPages(makeEmbedInfo(commandCollection, category, language, prefix));
    }

    return allBooks;
}

function makeEmbedInfo(commands, category, lang, prefix) {
    let embed = new MessageEmbed(),
        allEmbeds = [],
        categories = manualConfig.categories;

    for (let command of commands.values()) {
        let value;

        if (embed.fields.length == 25) allEmbeds.push(embed), embed = new MessageEmbed();
        if (!embed.title) embed.setTitle(
            lang.__categories[category]+' | '+(categories[category].enable ? '`✅`' : '`❌`')
        )
        if (!embed.color) embed.color = categories[category].color;

        let commandExtras = lang[command.name]
        if (!commandExtras) value = "No hay una descripción del comando";
        else {
            value =
              `${commandExtras.description}\n**Uso:** \`${prefix}${commandExtras.usage}\` | **Alias:** *${command.alias.join(", ")}*`;
        }

        embed.addFields({
            name: command.name,
            value: value,
        })
    }

    allEmbeds.push(embed)
    return allEmbeds
}

module.exports = getCommandsInfo;