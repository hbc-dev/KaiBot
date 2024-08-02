import { DiscordClient } from "./DiscordClient";
import { Button as ButtonID } from "@enums";
import { ButtonBuilderOptions, languages } from "@types";
import { resolveText } from "@utils/resolveText";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export class Button {
    public client: DiscordClient;
    public id: ButtonID;
    public language: languages;
    public varMap: Map<string, string | null | undefined> = new Map();

    // button data
    public disabled: boolean = false;
    public emoji: string | null = null;
    public value: string | null = null;
    public label: string | null = null;

    constructor(options: ButtonBuilderOptions) {
        const { client, id = ButtonID.Void, language = "en-US" } = options;

        this.id = id;
        this.client = client;
        this.language = language;
    }

    setId(id: ButtonID): this {
        this.id = id;

        return this;
    }

    setLanguage(language: languages): this {
        this.language = language;

        return this;
    }

    addVar(name: string, value: string | null | undefined): this {
        this.varMap.set(name, value);

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

    resolve(): ButtonBuilder {
        const { client, language, id, varMap } = this;

        const button = new ButtonBuilder();
        const locales = client.buttons.get(language);

        if (!locales) return button;

        const buttonData = locales.find(b => b.id == id);

        if (!buttonData) return button;

        const { disabled, emoji, label, style = ButtonStyle.Secondary, url } = buttonData;

        if (disabled) button.setDisabled(true);

        if (emoji) button.setEmoji(resolveText(emoji, varMap));

        if (label) button.setLabel(resolveText(label, varMap));

        if (url) button.setURL(resolveText(url, varMap));

        return button.setCustomId(id).setStyle(style);
    }

    static getRowAction(...buttons: Button[]): ActionRowBuilder<ButtonBuilder> {
        return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            ...buttons.map(b => b.resolve())
        );
    }
}