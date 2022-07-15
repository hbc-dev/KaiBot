module.exports = {
    disable: false,
    once: true,
    name: 'ready',
    execute: ({channels, user}) => {
        console.log(
            chalk.bgGreen.bold(`Me he conectado, soy ${user.tag}`)
        );

        channels.cache.get(process.env.CHANNEL_LOGS)
        .send(`¡Estoy activo, listo para buscar yo-kais!`)

        user.setPresence({
          status: "idle",
          activities: [
            {
              name: "Vuelta al ruedo",
              type: "PLAYING"
            },
          ],
        });
    }
}