const BaseEvent = require("../structures/BaseEvent");
const SlashCommandData = require("../structures/SlashCommandData");
const storeCode = require("../utils/storeCode");

const event = new BaseEvent({
  alwaysListen: true,
  disabled: false,
  execute: async (client, interaction) => {
    try {
      const data = new SlashCommandData(client, interaction);
      data.run(data);
    } catch (error) {
      if (error.name !== "YoError") throw error;
      else return storeCode(error.message, interaction); // Ignoramos por el momento los códigos de error
    }
  },
});

module.exports = event;
