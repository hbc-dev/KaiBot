const SlashCommandBase = require('../../structures/SlashCommandBase');

module.exports = new SlashCommandBase({
    onlyGuilds: true,
    internalAliases: ["llamar"],
    cooldown: 3.6e+6,
    run: async ({interaction, cmdOptions, channel, client, user}) => {
        let roleName = cmdOptions.getString('roles').split(':');
        let roleId = roleName.shift()
        let message = cmdOptions.getString('mensaje');
        let balance = await client.moneyAPI.getUserBalance("833109071422292008", user.id);

        if (balance.cash < 3000 && balance.bank < 3000) return interaction.reply({
            content: `¡No tienes suficiente dinero en la cartera! Te faltan **${balance.cash-3000}**🍫`
        });

        let TotalBalance = {};
        let type = balance.cash >= 3000 ? 'cash' : 'bank';
        TotalBalance[type] = -3000;

        roleName = roleName[0]; // lo convertimos a string, no encontré mejor forma

        if (roleName == 'POLLS') channel = client.channels.cache.get("880455133270515802");
        if (roleName == 'GAMES') channel = client.channels.cache.get("922600622413455430");

        await client.moneyAPI.editUserBalance(
            "833109071422292008", user.id, TotalBalance,
            `Ping to role in <#${channel.id}>`
        );

        interaction.reply({
            content: `¡Mensaje enviado! Las **3000🍫** se tomaron de tu **${type == 'cash' ? 'cartera' : 'banco'}**`,
            ephemeral: true
        });

        channel.send({
            content: `<@&${roleId}> | ¡**${user.username}** os reúne!\n\n"*${message}*"`
        });
    }
})
.setName('llamar')
.setNameLocalizations({
    "es-ES" : "llamar",
    "en-US" : "ping"
})
.setDescription('¡Llama a través de los roles a otros usuarios! 3000 🍫')
.setDescriptionLocalizations({
    "es-ES" : '¡Llama a través de los roles a otros usuarios! 3000 🍫',
    "en-US" : 'Call through roles to other users! 3000 🍫'
})
.addStringOption(
    x => x.addChoices(
        {   
            name: "Juegos 👾",
            name_localizations: {
                "es-ES": "Juegos 👾",
                "en-US": "Games 👾"
            },
            value: "964165147037954088:GAMES"
        },
        {
            name: 'Encuestas 📣',
            name_localizations: {
                "es-ES": "Encuestas 📣",
                "en-US": "Polls 📣"
            },
            value: "945804826837671946:POLLS"
        },
        {
            name: "Chat de voz 🗣",
            name_localizations: {
                "es-ES": "Chat de voz 🗣",
                "en-US": "Voice chat 🗣"
            },
            value: "1043884306478674061:VC"
        },
    )
    .setRequired(true)
    .setName('roles')
    .setNameLocalizations({
        "es-ES" : "roles",
        "en-US" : "roles"
    })
    .setDescription('¡Escoge el rol que quieres pinguear!')
    .setDescriptionLocalizations({
        "es-ES" : "¡Escoge el rol que quieres pinguear!",
        "en-US" : "Choose the role you want to ping!"
    })
)
.addStringOption(
    x => x.setMinLength(10)
    .setRequired(true)
    .setName('mensaje')
    .setNameLocalizations({
        "es-ES" : "mensaje",
        "en-US" : "message"
    })
    .setDescription('Diles a los demás porque quieres llamarles')
    .setDescriptionLocalizations({
        "es-ES" : "Diles a los demás porque quieres llamarles",
        "en-US" : "Tell others why you want to call them"
    })
)