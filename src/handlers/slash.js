const {REST, Routes} = require('discord.js')
const {readdirSync} = require('fs')
const {resolve} = require('path')

module.exports = async () => {
    const guilds = JSON.parse(process.env.ALLOWED_GUILDS);
    const rest = new REST().setToken(process.env.TOKEN);
    const commmands = {global: [], privates: []};
    const unloaded = [];
    
    let path = resolve(__dirname, '../slashcommands')

    for (let folder of readdirSync(path)) {
        let files = resolve(path, folder);
        let slash = resolve(files, `${folder}.js`);

        try {
            let point = readdirSync(files).filter(file => file == `${file}.js`);

            if (!point) {unloaded.push(folder);continue;}

            let data = require(slash)

            if (!data.onlyGuilds) commmands.global.push(data.toJSON())
            else commmands.privates.push(data.toJSON())
        } catch(e) {unloaded.push(files);}
    }

    (async () => {
        try {
            if (commmands.privates.length > 0) {
                for (let guild of guilds) {
                    await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENT_ID, guild),
                        {body: commmands.privates}
                    )
                }
            }

            if (commmands.global.length > 0) await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                {body: commmands.global}
            )
        } catch(e) {unloaded.push(`Error: ${e.message}`)}
    })().then(() => {
        console.log(
            chalk.greenBright(`Se han cargado un total de ${chalk.bold(commmands.global.length+commmands.privates.length)} slashcommands`)
        )

        console.log(chalk.redBright(`Un total de ${chalk.bold(unloaded.length)} slashcommands no han sido cargados\n\n`))
    
        if (unloaded.length > 0) console.log(
            `Lista de slashcommands no cargados:\n\n${unloaded.map(cmd => chalk.italic(cmd)+'\n').join('')}`
        );
    });
}