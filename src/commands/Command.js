class Command {
    constructor(message, client) {
        this.client = client;
        this.message = message;
        this.guild = message.guild;
        this.author = message.author;
        this.member = message.member;
    }
}

module.exports = Command;