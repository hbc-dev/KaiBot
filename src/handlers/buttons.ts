import { Button } from "@models/Button";
import { DiscordClient } from "@modules/DiscordClient";
import { ResolvedButton } from "@types";

export async function load_buttons(client: DiscordClient): Promise<void> {
    const locales = await Button.findAll();

    for (const local of locales) {
        const data = local.toJSON();
        const cached = client.buttons.get(data.language) ?? [];
        const resolved: ResolvedButton = {
            id: data.id,
            style: data.style ?? 1,
            disabled: data.disabled ?? false,
            label: data.label,
            emoji: data.emoji,
            url: data.url
        }

        cached.push(resolved);
        client.buttons.set(data.language, cached);
    }
}