import { SelectMenu } from "@models/SelectMenu";
import { SelectMenuOption } from "@models/SelectMenuOption";
import { DiscordClient } from "@modules/DiscordClient";
import { ResolvedMenu, ResolvedMenuOption } from "@types";

async function resolveOptions(menu_id: string): Promise<ResolvedMenuOption[]> {
    const options: ResolvedMenuOption[] = [];
    const locales = await SelectMenuOption.findAll({
        where: { menu_id }
    });

    for (let local of locales) {
        const data = local.toJSON();
        const resolved: ResolvedMenuOption = {
            default: data.default ?? false,
            label: data.label,
            value: data.value
        }

        if (data.description) resolved.description = data.description;
        if (data.emoji) resolved.emoji = data.emoji;

        options.push(resolved);
    }

    return options;
}

export async function load_menus(client: DiscordClient): Promise<void> {
    const locales = await SelectMenu.findAll();

    for (let local of locales) {
        const data = local.toJSON();
        const cached = client.menus.get(data.language) ?? [];
        const resolved: ResolvedMenu = {
            id: data.id,
            maxValue: data.maxValues ?? 1,
            minValues: data.minValues ?? 1,
            disabled: data.disabled ?? false,
            options: await resolveOptions(data.id)
        }

        if (data.placeholder) resolved.placeholder = data.placeholder;

        cached.push(resolved);
        client.menus.set(data.language, cached);
    }
}