const { Message, CommandInteraction } = require("discord.js");
const CommandData = require("../structures/CommandData");

/**
 * Almacena los diferentes códigos en archivos .log
 * @param {string} code El código de error
 * @param {Message & CommandInteraction} message Los datos del comando
 */
function storeCode(code, {client, author, member}) {
    client.shard.broadcastEval(async (c, {code, author, member}) => {
        let userData = author ?? await c.users.fetch(member.userId);

        let tag = userData?.tag ?? userData.username+'#'+userData.discriminator;

        let codes = {
            SUPER_ADMIN: `> [👑] El usuario **${tag}** intentó hacer uso de un comando super admin.`,
            IS_DISABLED: `> [🚫] El usuario **${tag}** ha intentado usar un comando deshabilitado.`,
        };

        code = codes[code];
        if (!code) return;

        c.channels.cache.find(channel => channel.id == process.env.LOGS_CHANNEL).send({
            content: code
        });
    }, {context: {code, author, member}});
}

module.exports = storeCode;