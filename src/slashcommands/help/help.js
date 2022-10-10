const SlashCommandBase = require('../../structures/SlashCommandBase')

const slash = new SlashCommandBase({
  onlyGuilds: true,
  internalAliases: ["test"],
  run: ({ interaction, cmdOptions, client, user }) => {
    let game = cmdOptions.get("juego").value;
    let yokais = cmdOptions.get("yokais").value.match(/[^,(?! )]+/gm);
    let medallium = cmdOptions.get("número_medallium")?.value;

    for (let yokai of yokais) {
        if (/^\d+$/.test(yokai)) return interaction.reply({
            ephemeral: true,
            content:"Parece que has introducido un número como yokai, inténtalo de nuevo",
        });
    }

    interaction.reply({
        content: "Tu pedido está siendo procesado por Yo-Kai Shop",
        ephemeral: true
    });

    client.shard.broadcastEval(async (c, {user, medallium, game, yokais}) => {
        const {EmbedBuilder} = require('discord.js')
        let channel = await c.channels.fetch("1028770531413065758")

        channel.send({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL})
                .setDescription(
                    `¡Nuevo pedido! Los datos por aquí 👇\n\n**Juego:** *${game}*\n**Yo-Kais:** *__${yokais.join(', ')}__*\n**Medallium:** *${medallium ?? 'No especificado'}*\n**Usuario:** *${user.id}*`
                )
                .setTitle(`Nuevo pedido - ${game}`)
                .setColor(`Random`)
            ]
        });
    }, {context: {user, medallium, game, yokais}})
  },
})
  .setName("test")
  .setNameLocalizations({
    "es-ES": "pedido",
    "en-US" : "order"
  })
  .setDescription("¡Pide yo-kai a través del servicio de KaiBot!")
  .setDescriptionLocalizations({
    "es-ES": "¡Pide yo-kai a través del servicio de KaiBot!",
    "en-US": "Order yo-kai through the KaiBot service!"
  })
  .addStringOption((x) =>
    x
      .setRequired(true)
      .setName("yokais")
      .setDescription(
        "Elige los yo-kais a pedir. Por favor, si quieres más de uno, usa la coma"
      )
  )
  .addStringOption((x) =>
    x
      .setRequired(true)
      .setName("juego")
      .setDescription("Elige el juego para el que quieres comprar los yokais")
      .addChoices(
        { name: "Yo-Kai Watch 2", value: "ykw2" },
        { name: "Yo-Kai Watch Blaster", value: "ykwb" },
        { name: 'Yo-Kai Watch 3', value: 'ykw3' },
      )
  )
  .addIntegerOption((x) =>
    x
        .setName("número_medallium")
        .setDescription(`Especifica el número de medallium (mayor precisión)`)
        .setMinValue(1)
        .setMaxValue(698)
  )

module.exports = slash