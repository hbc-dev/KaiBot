import { REST, Routes } from "discord.js";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { DiscordClient } from "@modules/DiscordClient";

export async function load_commands(client: DiscordClient): Promise<void> {
    const path = join(__dirname, "../commands");
    const folders = (await readdir(path)).filter(folder => !folder.endsWith(".ts") && !folder.endsWith(".json"));
    const commands: any[] = [];

    for (let folder of folders) {
        const files = (await readdir(join(path, folder))).filter(files => files.endsWith('.ts'));

        for (let file of files) {
            try {
                const filePath = join(path, folder, file);
                const { command, options, subcommands } = await import(filePath);

                if (!command.name) {
                    console.log(`Error loading command ${folder}/${file}\n`);
                    continue;
                }

                await command.loadLocales();
                if (options) await command.loadOptionsLocales(options);

                if (subcommands) {
                    for (const { command: subcommand, options } of subcommands) {
                        await subcommand.loadLocales(command.name);

                        command.addSubcommand(subcommand);

                        if (options) subcommand.loadOptionsLocales(options, command.name);
                    }
                }

                client.commands.set(command.name, command);
                commands.push(command.toJSON());
                
                console.log(`Loaded command: ${command.name}\n`);
            } catch(err) {
                console.log(`Error loading command: ${err}\n`);
            }
        }
    }

    if (commands.length == 0) return console.log("No loaded commands\n");

    const rest = new REST().setToken(client.token ?? "");

    try {   
        const route = Routes.applicationGuildCommands(
            process.env.CLIENT_ID ?? "",
            process.env.GUILD_ID ?? "",
        );

        await rest.put(route, { body: commands });
        console.log(`Loaded ${commands.length} commands in the BETA guild\n`);
    } catch(err) {
        console.log(`We have an error when we charged slash commands: ${err}\n`)
    }
}