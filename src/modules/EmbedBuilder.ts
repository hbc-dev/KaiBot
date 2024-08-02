import { ColorResolvable, EmbedBuilder } from "discord.js";
import { DiscordClient } from "./DiscordClient";
import { Embed as EmbedID } from "@enums";
import { EmbedBuilderOptions, languages } from "@types";
import { resolveText } from "@utils/resolveText";

export class Embed {
    public client: DiscordClient;
    public id: EmbedID;
    public language: languages;
    public varMap: Map<string, string | null | undefined> = new Map();

    // embed options
    public authorURL?: string;
    public authorIconURL?: string;
    public footerIconURL?: string;
    public color?: ColorResolvable | null = null;
    public thumbnail?: string | null = null;
    public image?: string | null = null;


    constructor(options: EmbedBuilderOptions) {
        const { client, id = EmbedID.Void, language = "en-US" } = options;

        this.id = id;
        this.client = client;
        this.language = language;
    }

    setId(id: EmbedID): this {
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

    setAuthorURL(url?: string): this {
        this.authorURL = url;

        return this;
    }

    setAuthorIconURL(url?: string): this {
        this.authorIconURL = url;

        return this;
    }

    setFooterIconURL(url?: string): this {
        this.footerIconURL = url;

        return this;
    }

    setColor(color?: ColorResolvable | null): this {
        this.color = color ?? null;

        return this;
    }

    setThumbnail(url?: string | null): this {
        this.thumbnail = url ?? null;

        return this;
    }

    setImage(url?: string | null): this {
        this.image = url ?? null;

        return this;
    }

    resolve(): EmbedBuilder {
        const { client, id, varMap, authorIconURL, authorURL, footerIconURL, color, thumbnail, image, language } = this;

        const embed = new EmbedBuilder();
        const locales = client.embeds.get(language);

        if (!locales) return embed;

        const embedData = locales.find(e => e.id == id);

        if (!embedData) return embed;

        const { author, title, description, footer, fields } = embedData;

        embed.setTitle(resolveText(title, varMap));

        if (author) {
            const name = resolveText(author?.name ?? "", varMap);

            if (name.length > 0) embed.setAuthor({ name, url: authorURL, iconURL: authorIconURL });
        }


        if (description) {
            const text = resolveText(description, varMap);

            if (text.length > 0) embed.setDescription(text);
        }

        if (footer) {
            const text = resolveText(footer.text, varMap);

            if (text.length > 0) embed.setFooter({ text, iconURL: footerIconURL });
        }

        if (fields) {
            for (const field of fields) {
                const name = resolveText(field.name, varMap);
                const value = resolveText(field.value, varMap);

                if (name.length > 0 && value.length > 0) embed.addFields({ name, value });
            }
        }

        if (color) embed.setColor(color);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (image) embed.setImage(image);

        return embed;
    }
}