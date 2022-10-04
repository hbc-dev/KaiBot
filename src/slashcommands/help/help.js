const SlashCommandBase = require('../../structures/SlashCommandBase')

const slash = new SlashCommandBase({
    onlyGuilds: true
})
.setName('test')
.setDescription('Esto es un comando de ámbito privado')

module.exports = slash