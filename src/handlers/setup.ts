import { DiscordClient } from "@modules/DiscordClient";
import { load_buttons } from "./buttons";
import { load_commands } from "./commands";
import { load_components } from "./components";
import { load_embeds } from "./embeds";
import { load_events } from "./events";
import { load_locales } from "./locales";
import { load_menus } from "./menus";
import { load_modals } from "./modals";

export async function handlerSetup(client: DiscordClient) {
    // text
    await load_locales(client);
    await load_embeds(client);
    await load_buttons(client);
    await load_menus(client);
    await load_modals(client);

    // functionality
    await load_components(client);
    await load_commands(client);
    await load_events(client);
}