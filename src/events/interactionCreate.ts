import { ButtonInteraction, ChatInputCommandInteraction, Events, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { Event } from "@modules/Event";
import { CommandManager } from "@modules/CommandManager";
import { ButtonManager } from "@modules/ButtonManager";
import { SelectMenuManager } from "@modules/SelectMenuManager";
import { ModalManager } from "@modules/ModalManager";

// All the posible interactions
type BaseInteraction = ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction | ModalSubmitInteraction;

export const event = new Event()
.setName(Events.InteractionCreate)
.setFunction((client, interaction: BaseInteraction) => {
    if (interaction?.isChatInputCommand()) {
        const manager = new CommandManager(client, interaction);
    } else if (interaction.isButton()) {
        const manager = new ButtonManager(client, interaction);
    } else if (interaction.isStringSelectMenu()) {
        const manager = new SelectMenuManager(client, interaction)
    } else if (interaction.isModalSubmit()) {
        const manager = new ModalManager(client, interaction);
    }
    // more interactions...
});