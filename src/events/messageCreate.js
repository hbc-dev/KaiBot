const BaseEvent = require("../structures/BaseEvent");
const CommandData = require("../structures/CommandData");
const storeCode = require("../utils/storeCode");

const event = new BaseEvent({
  alwaysListen: true,
  disabled: false,
  execute: async (client, message) => {
    try {
      const data = new CommandData(client, message);
      data.run(data);
    } catch(error) {
      if (error.name !== 'YoError') throw error;
      else return storeCode(error.message, message)// Ignoramos por el momento los códigos de error
    }
  },
});

module.exports = event;
