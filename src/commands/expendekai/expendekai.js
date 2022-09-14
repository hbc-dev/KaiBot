const BaseCommand = require("../../structures/BaseCommand");

const expendakai = new BaseCommand({
    names: {
        "es-ES" : "expendekai"
    },
    aliases: ["gacha"],
    disabled: false,
    admin: true,
    run: (data) => {
        data.channel.send({
            content: "Este es el futuro servicio de la Expendekai"
        });
    }
});

module.exports = expendakai;