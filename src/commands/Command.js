class Command {
    constructor(client, message, language, prefix) {
        this.client = client;
        this.message = message;
        this.language = language;
        this.guild = message.guild;
        this.channel = message.channel;
        this.author = message.author;
        this.member = message.member;

        this.args = message.content.trim().slice(prefix.length).split(' ');
        
        let commandName = this.args.shift().toLowerCase();
        this.command = client.commands.find(
            cmd => cmd.name == commandName || cmd.alias.includes(commandName) 
        )
    }
}

module.exports = Command;