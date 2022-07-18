/**
 * @function execute The executable
 * @param {Object} channel The Discord Channel
 */

module.exports = {
  name: "ping",
  alias: ["pong"],
  usage: 'ping',
  admin: true,
  disable: false,
  enableDM: false,
  execute: ({ channel }) => {
    channel.send("Pong!");
  },
};
