import { SelectMenuBuilderOptions, languages } from "@types";
import { SelectMenu as SelectMenuID } from "@enums";
import { DiscordClient } from "./DiscordClient";
import { resolveText } from "@utils/resolveText";
import { StringSelectMenuBuilder } from "@discordjs/builders";
import { ActionRowBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export class SelectMenu {
    public client: DiscordClient;
    public id: SelectMenuID;
    public language: languages;
    public varMap: Map<string, string | null | undefined> = new Map();

    // select menu options
    public defaultOption?: string;

    constructor(options: SelectMenuBuilderOptions) {
        const { client, id = SelectMenuID.Void, language = "en-US" } = options;

        this.id = id;
        this.client = client;
        this.language = language;
    }

    setId(id: SelectMenuID): this {
        this.id = id;

        return this;
    }

    setLanguage(language: languages): this {
        this.language = language;

        return this;
    }

    addVar(name: string, value: string): this {
        this.varMap.set(name, value);

        return this;
    }

    setVars(object: Record<string, any>): this {
        for (const key of Object.keys(object)) {
            this.varMap.set(key, object[key]);
        }

        return this;
    }

    removeVar(name: string): this {
        this.varMap.delete(name);

        return this;
    }

    cleanVar(): this {
        this.varMap.clear();

        return this;
    }

    setDefaultOption(id: string): this {
        this.defaultOption = id;

        return this;
    }

    resolve(): ActionRowBuilder<StringSelectMenuBuilder> {
        const { client, language, varMap, id, defaultOption } = this;

        const locales = client.menus.get(language);

        const menu = new StringSelectMenuBuilder();
        const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>();

        if (!locales) return actionRow.addComponents(menu);

        const menuData = locales.find(m => m.id == id);

        if (!menuData) return actionRow.addComponents(menu);

        const { disabled, maxValue, minValues, options = [], placeholder } = menuData;

        menu.setCustomId(id)
        .setDisabled(disabled)
        .setMaxValues(maxValue)
        .setMinValues(minValues);
        
        if (placeholder) menu.setPlaceholder(placeholder);

        for (const option of options) {
            const { default: isDefaultOption, description, emoji, label, value } = option;

            const optionBuilder = new StringSelectMenuOptionBuilder()
            .setDefault(isDefaultOption)
            .setLabel(resolveText(label, varMap))
            .setValue(value);

            if (defaultOption) optionBuilder.setDefault(defaultOption == value);

            if (description) optionBuilder.setDescription(resolveText(description, varMap));

            if (emoji) optionBuilder.setEmoji(resolveText(emoji, varMap));

            menu.addOptions(optionBuilder);
        }
        
        return actionRow.addComponents(menu);
    }
}