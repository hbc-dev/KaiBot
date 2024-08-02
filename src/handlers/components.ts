// Only funcionally supported
// aesthetics in the respectives handlers and caches

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { DiscordClient } from "@modules/DiscordClient";

export async function load_components(client: DiscordClient): Promise<void> {
    const path = join(__dirname, "../components");
    const folders = (await readdir(path)).filter(file => !file.endsWith(".ts"));

    for (let folder of folders) {
        const files = (await readdir(join(path, folder))).filter(file => file.endsWith(".ts"));

        for (let file of files) {
            const key = file.slice(0, file.length - 3);// remove .ts
            const { component } = await import(join(path, folder, file));
            
            client.components.set(`${folder}:${key}`, component.toJSON());
        }
    }
}