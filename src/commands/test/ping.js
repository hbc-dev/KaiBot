module.exports = {
    name: "ping",
    alias: ["pong"],
    admin: true,
    disable: false,
    enableDM: false,
    execute: ({channel}) => {
        channel.send('Pong!')
    }
}