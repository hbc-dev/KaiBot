const BaseCommand = require("../../structures/BaseCommand");

const expendakai = new BaseCommand({
    names: {
        "es-ES" : "ayuda",
        "en-US" : "help"
    },
    aliases: ["hlp"],
    disabled: false,
    admin: true,
    run: (data) => {
        data.channel.send({
            content: "Este es el futuro servicio de ayuda de KaiBot"
        });
    }
});

module.exports = expendakai;
