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
    run: ({client, channel, author, message}) => {
        const embed = new EmbedBuilder()
        .setTitle(`Comandos KaiBot - PlaceHolder`)
        .setAuthor({iconURL: author.avatarURL({size: 4096}), name: author.tag})
        .setColor('Random')
        .setDescription(
            `¡Hola cazador de yo-kais! Soy KaiBot y mi misión es mejorar tu estacia aquí\nEsto **no es** un producto final.`
        )

        let isAdmin = JSON.parse(process.env.ADMIN_IDS).includes(author.id);
        let fields = {};

        for (let cmd of client.commands.values()) {
            if (!isAdmin && cmd.disabled) continue;
            if (!isAdmin && cmd.admin) continue;

            if (!fields[cmd.category]) fields[cmd.category] = {
                description: ""
            };

            fields[cmd.category].description +=
            `\`${process.env.PREFIX+cmd.names["es-ES"]}\` ➤ ${cmd.descriptions["es-ES"]}`;
        }

        for (let field of Object.keys(fields)) {
            embed.addFields({
                name: field,
                value: fields[field].description
            })
        }

        channel.send({
            embeds: [embed]
        })
    }
});

module.exports = expendakai;
