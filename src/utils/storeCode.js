const { Message } = require("discord.js");
const CommandData = require("../structures/CommandData");

/**
 * Almacena los diferentes códigos en archivos .log
 * @param {string} code El código de error
 * @param {Message} message Los datos del comando
 */
function storeCode(code, {client, author}) {
    client.shard.broadcastEval((c, {code, author}) => {
        let codes = {
            SUPER_ADMIN: `> [👑] El usuario **${author.tag}** intentó hacer uso de un comando super admin.`,
            IS_DISABLED: `> [🚫] El usuario **${author.tag}** ha intentado usar un comando deshabilitado.`,
        };

        code = codes[code];
        if (!code) return;

        c.channels.cache.find(channel => channel.id == process.env.LOGS_CHANNEL).send({
            content: code
        });
    }, {context: {code, author}});
}

module.exports = storeCode;