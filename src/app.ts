import { join } from "node:path";
import { IntentsBitField, Partials } from "discord.js";
import { login } from "./login";
import { DiscordClient } from "@modules/DiscordClient";
import { loadModels } from "@localization/loadModels";

process.loadEnvFile(join(__dirname, "../.env"));

export const client = new DiscordClient({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.Guilds
    ],
    partials: [
        Partials.GuildMember,
        Partials.User,
        Partials.Channel,
        Partials.Reaction,
    ],
});

loadModels().then(() => login(client));