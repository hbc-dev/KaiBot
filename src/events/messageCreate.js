module.exports = {
  disable: true,
  name: "messageCreate",
  execute: (client) => {
    console.log(`Me he conectado, soy ${client.user}`);
  },
};
