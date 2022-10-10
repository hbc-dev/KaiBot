const BaseCommand = require("../../structures/BaseCommand");
const {EmbedBuilder} = require('discord.js')

const expendakai = new BaseCommand({
    names: {
        "es-ES" : "ayuda",
        "en-US" : "help"
    },
    descriptions: {
        "es-ES" : "Mira mis comandos"
    },
    aliases: ["hlp"],
    disabled: false,
    admin: true,
    category: 'info',
    run: ({client, channel, author, language, command}) => {
        language = language['help'];

        const embed = new EmbedBuilder(language.embeds.menu)
        .setAuthor({iconURL: author.avatarURL({size: 4096}), name: author.tag})
        .setImage("https://cdn.discordapp.com/attachments/980215101414080564/1022736551949652018/20220923_070655.jpg")
        .setColor('Random')

        let isAdmin = JSON.parse(process.env.ADMIN_IDS).includes(author.id);
        let fields = {};

        for (let cmd of client.commands.values()) {
            if (!isAdmin && cmd.disabled) continue;
            if (!isAdmin && cmd.admin) continue;

            if (!fields[cmd.category]) fields[cmd.category] = {
                description: ""
            };

            fields[cmd.category].description +=
            `\`${process.env.PREFIX+cmd.names["es-ES"]}\` ➤ ${cmd.descriptions["es-ES"]} | **aliases**: \`${cmd.aliases.join(', ')}\``;
        }

        for (let field of Object.keys(fields)) {
            embed.addFields({
                name: field,
                value: fields[field].description
            })
        }

        channel.send({
            embeds: [embed]
        });
    }
});

module.exports = expendakai;
