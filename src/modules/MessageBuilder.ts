import { Localization, MessageOptions, MessageTypes, languages } from "@types";
import { Message as MessageID } from "@enums";
import { DiscordClient } from "./DiscordClient";
import { resolveText } from "@utils/resolveText";

export class Message {
    public client: DiscordClient;
    public id: MessageID;
    public language: languages;
    public varMap: Map<string, string | null | undefined> = new Map();

    constructor(options: MessageOptions) {
        const { client, id = MessageID.NoLocales, language = "en-US" } = options;

        this.id = id;
        this.client = client;
        this.language = language;
    }

    setId(id: MessageTypes): this {
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

    resolve() {
        const client = this.client;
        const cache = client.localization;
        let locales = cache.get(this.language);

        if (!locales) {
            this.id = MessageID.NoLocales;
            this.language = "en-US";

            locales = <Localization[]>cache.get(this.language);
        }

        let message = locales.find(m => m.id == this.id);

        if (!message) {
            message = <Localization>locales
            .find(m => m.id == MessageID.MessageNotFound);

            if (!message) return this.id;
        }

        return resolveText(message.value, this.varMap) ?? this.id;
    }
}