const YoError = require("../../../utils/botError");
const { MessageSelectMenu, MessageActionRow, MessageButton, Collection } = require("discord.js"),
        makeMenuTypes = ({
            id = 'DEFAULT_SELECT_MENU',
            disabled = false,
            data = [],
            minValues,
            maxValues,
        } = {}),
        makeButtonsTypes = ({
            disabled = false,
            label = 'DEFAULT BUTTON',
            style = 'PRIMARY',
            url = 'https://github.com/167BOT',
            id,
            emoji
        } = {})

class ComponentCollection {

    constructor() {
        this.components = [];
    }

    makeMenu({id, disabled, data, minValues, maxValues} = makeMenuTypes) {
        const menu = new MessageSelectMenu();
        const container = new MessageActionRow();

        menu.setCustomId(id);
        menu.setDisabled(disabled)

        if (minValues) menu.minValues(minValues)
        if (maxValues) menu.maxValues(maxValues)

        menu.addOptions(data)
        container.addComponents(menu);
        this.components.push(container)
    }

    makeButtons({data = []}) {
        if (!Array.isArray(data)) throw new YoError('Los botones deben de ir en un array')
        let container = new MessageActionRow();
        
        for (button of data) {
            if (container.components == 5) {
                this.components.push(container)
                container = new MessageActionRow();
            }

            if (typeof button !== "object") throw new YoError('Uno de los botones introducidos no es un objeto')

            this.#setButtonValues(button)
        }
    }

    #setButtonValues({disabled, label, style, url, id, emoji} = makeButtonsTypes) {
        const button = new MessageButton();
        button.setCustomId(id)
        button.setStyle(style)

        if ()
    }
}

const collection = new ComponentCollection();
collection.makeMenu({
  id: "my_menu",
  data: [
    {
      label: "Inicio",
      value: "home",
      descrition: "El menú de inicio xd",
    },
    {
      label: "Xd",
      value: "other",
      descrition: "El menú de otros xd",
    },
  ],
});

console.log(collection.components)

