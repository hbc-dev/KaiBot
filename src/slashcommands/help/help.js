const {SlashCommandBuilder} = require('discord.js')

const slash = new SlashCommandBuilder().setName('test').setDescription('ESTO ES UN TEST')
slash.onlyGuilds;

module.exports = slash