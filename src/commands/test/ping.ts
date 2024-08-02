import { Command } from "@modules/Command";
import { ping } from "../locales.json";
import { Message as MessageID } from "@enums";
import { Message } from "@modules/MessageBuilder";

export const command = new Command()
.setName(ping.name)
.setDescription(ping.description)
.setVersion("2.0.0")
.setFunction(async ({ interaction, client, language }) => {
    const message = new Message({ language, client })
    .setId(MessageID.PingSended);

    return interaction.reply({ content: message.resolve() });
});