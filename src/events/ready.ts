import { Events } from "discord.js";
import { Event } from "@modules/Event";

export const event = new Event()
.setName(Events.ClientReady)
.setOnce(true)
.setFunction((client) => {
    console.log("Client properly connected to the Discord API");
    console.log(`${client.commands.size} commands cached!\n`);
});