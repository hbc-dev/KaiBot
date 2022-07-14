module.exports = {
    disable: false,
    name: 'ready',
    execute: ({channels, user} = client) => {
        console.log(
            chalk.bgGreen.bold(`Me he conectado, soy ${user.tag}`)
        );

        channels.cache.get(process.env.CHANNEL_LOGS)
        .send(`¡Estoy activo, listo para buscar yo-kais!`)
    }
}