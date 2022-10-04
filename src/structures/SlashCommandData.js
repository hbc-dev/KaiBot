const { CommandInteraction, BaseInteraction } = require("discord.js");

class SlashCommandData {
    /**
     * Los datos
     * @param {CommandInteraction} int 
     */
    constructor(client, int) {
        console.log(int.isCommand());
        int.reply({
            ephemeral: true,
            content: "Esto es un placeholder muy vago a nivel visual y de código para probar los slash commands"
        });
    }
}

module.exports = SlashCommandData;