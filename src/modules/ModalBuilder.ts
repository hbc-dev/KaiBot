import { DiscordClient } from "./DiscordClient";
import { Modal as ModalID } from "@enums";
import { ModalBuilderOptions, languages } from "@types";
import { resolveText } from "@utils/resolveText";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "discord.js";

export class Modal {
    public client: DiscordClient;
    public id: ModalID;
    public language: languages;
    public varMap: Map<string, string | null | undefined> = new Map();

    constructor(options: ModalBuilderOptions) {
        const { client, id = ModalID.Void, language = "en-US" } = options;

        this.id = id;
        this.client = client;
        this.language = language;
    }

    setId(id: ModalID): this {
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

    resolve(): ModalBuilder {
        const { client, language, id, varMap } = this;

        const modal = new ModalBuilder();
        const locales = client.modals.get(language);

        if (!locales) return modal;

        const modalData = locales.find(m => m.id == id);

        if (!modalData) return modal;

        const { title, options } = modalData;

        for (const option of options) {
            const { id: fieldId, label, max_length, min_length, placeholder, required, style, value } = option;

            const actionRow = new ActionRowBuilder<TextInputBuilder>();
            const field = new TextInputBuilder()
            .setCustomId(fieldId)
            .setLabel(resolveText(label, varMap))
            .setMaxLength(max_length)
            .setMinLength(min_length)
            .setRequired(required)
            .setStyle(style);

            if (placeholder) field.setPlaceholder(resolveText(placeholder, varMap));
            if (value) field.setValue(resolveText(value, varMap));
            
            modal.addComponents(actionRow.addComponents(field));
        }

        return modal.setCustomId(id).setTitle(resolveText(title, varMap));
    }
}