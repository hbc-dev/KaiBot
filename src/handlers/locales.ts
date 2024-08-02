import { i18n } from "@models/i18n";
import { DiscordClient } from "@modules/DiscordClient";

export async function load_locales(client: DiscordClient): Promise<void> {
    let locales = await i18n.findAll();

    for (let local of locales) {
        let data = local.toJSON();
        let cached = client.localization.get(data.language);

        if (!cached) client.localization.set(data.language, [data]);
        else {
            cached.push(data);
            client.localization.set(data.language, cached);// push data if have already been cached
        }
    }
}