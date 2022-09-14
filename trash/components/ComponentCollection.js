const YoError = require("../../../utils/botError");
const { SelectMenuBuilder, ActionRowBuilder, ButtonBuilder, Collection } = require("discord.js")

class ComponentCollection {

    constructor() {
        this.components = [];
    }

    makeMenu({id, disabled, options, minValues, maxValues} = makeMenuTypes, {name, group} = {}) {
        const menu = new SelectMenuBuilder();
        const container = new ActionRowBuilder();

        if (name) {
            if (typeof name !== 'string') throw new YoError(`Se esperaba un string como "name"`)
            if (name.length < 1) throw new YoError(`Se ha introducido como nombre un string vacio`)

            if (this.components.some(row => row.customName == name)) throw new YoError(
                `Ya hay un componente con el nombre ${name}`
            ); else container.customName = name;
        }

        if (group) {
            if (typeof group !== "string")
              throw new YoError(`Se esperaba un string como "name"`);
            if (group.length < 1)
              throw new YoError(
                `Se ha introducido como nombre un string vacio`
              );

            container.componentGroup = group;
        }

        menu.setCustomId(id);
        menu.setDisabled(disabled)

        if (minValues) menu.minValues(minValues)
        if (maxValues) menu.maxValues(maxValues)

        menu.addOptions(options)
        container.addComponents(menu);
        this.components.push(container)
    }

    makeButtons(data = [], {name, group} = {}) {
        if (!Array.isArray(data)) throw new YoError('Los botones deben de ir en un array')
        let container = new ActionRowBuilder();
        
        for (let button of data) {
            if (button instanceof ButtonBuilder) {container.addComponents(button);continue};
            if (container.components.length == 5) {
                this.components.push(container)
                container = new ActionRowBuilder();
            }

            if (typeof button !== "object") throw new YoError('Uno de los botones introducidos no es un objeto')

            container.addComponents(this.#setButtonValues(button))
        }

        if (container.components.length > 0) this.components.push(container)
        if (name) {
            if (typeof name !== 'string') throw new YoError(`Se esperaba un string como "name"`)
            if (name.length < 1) throw new YoError(`Se ha introducido como nombre un string vacio`)

            if (this.components.some(row => row.customName == name)) throw new YoError(
                `Ya hay un componente con el nombre ${name}`
            ); else container.customName = name;
        }

        if (group) {
            if (typeof group !== "string")
              throw new YoError(`Se esperaba un string como "name"`);
            if (group.length < 1)
              throw new YoError(
                `Se ha introducido como nombre un string vacio`
              );

            container.componentGroup = group
        }
    }

    #setButtonValues({disabled, label, style, url, id, emoji} = {}) {
        const button = new ButtonBuilder();
        button.setCustomId(id)
        button.setStyle(style)

        if (label) button.setLabel(label)
        if (emoji) button.setEmoji(emoji)
        if (
            (style == 1 || style == 'Link') &&
            url
            ) button.setURL(url)
        
        if (disabled) button.disabled(true)
        
        return button
    }

    getComponents({type, id, name, group} = {}) {
        let data = this.components;

        if (type) data = data.filter((row) =>
            row.components.some((subrow) => subrow.data.type== this.#resolveTypeComponent(type))
        );
        if (id) data = data.filter(row => 
            row.components.some(subrow => subrow.data.custom_id == id)
        );
        if (group) data = data.filter((row) => row.componentGroup == group);
        if (name) data = data.filter(row => row.customName == name)

        return data
    }

    #resolveTypeComponent(type) {
        if (typeof type == 'number' && type > 0 && type < 5) return type

        let types = {
            'actionrow' : 1,
            'button' : 2,
            'selectmenu' : 3,
            'textinput' : 4,
        }

        return types[type]
    }
}

const collection = new ComponentCollection();
collection.makeMenu({
    id: 'MY_MENU',
    options: [{
        default: true,
        label: 'Test menu',
        value: 'FIRST_OPTION'
    }]
})

collection.makeButtons([
    {
        style: 1,
        label: 'Hello world',
        id: 'MY_BUTTON'
    }
])

console.log(collection.components)

module.exports = ComponentCollection;
