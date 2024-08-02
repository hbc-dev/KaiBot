import { handlerSetup } from "./handlers/setup";
import { DiscordClient } from "@modules/DiscordClient";

export async function login(client: DiscordClient) {
    await client.login(process.env.TOKEN);
    await handlerSetup(client);
}