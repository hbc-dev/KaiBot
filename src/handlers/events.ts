import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { DiscordClient } from "@modules/DiscordClient";

export async function load_events(client: DiscordClient): Promise<void> {
    let path = join(__dirname, "../events");
    let files = (await readdir(path)).filter(file => file.endsWith('.ts'));

    for (let file of files) {
        let { event } = await import(join(path, file));

        if (!event.name) {
            console.log(`Error loading event ${file}\n`);
            continue;
        }

        if (event.disable) {
            console.log(`Disabled "${event.name}" listener`);
            continue;
        }

        if (!event.once) client.on(event.name, (...args) => event.execute(client, ...args));
        else client.once(event.name, (...args) => event.execute(client, ...args));
    }
}