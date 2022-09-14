const BaseEvent = require("../structures/BaseEvent");

const event = new BaseEvent({
  alwaysListen: false,
  disabled: false,
  execute: async ({ user, shard }) => {
    let allGuilds = await shard.fetchClientValues("guilds.cache.size");
    let allChannels = await shard.fetchClientValues("channels.cache.size");

    let allUsers = (
      await shard.broadcastEval((c) =>
        c.guilds.cache.reduce((prev, next) => prev + next.memberCount, 0)
      )
    ).reduce((prev, next) => prev + next, 0);

    allChannels = allChannels.reduce((prev, next) => prev + next, 0);

    allGuilds = allGuilds.reduce((prev, next) => prev + next, 0);

    console.log(
      `Estoy conectado como ${user.tag}`,
      `\nEstoy dentro de ${
        allGuilds?.size ?? allGuilds
      } servidores y viendo a ${allUsers} usuarios y ${allChannels} canales`
    );

    await shard.broadcastEval((s) => {
      const { EmbedBuilder } = require("discord.js");

      s.channels.cache.find((c) => c.id == process.env.STATUS_CHANNEL).send({
        embeds: [new EmbedBuilder().setTitle('¡Estoy conectado!').setColor('Green')]
      });
    });
  },
});

module.exports = event;
