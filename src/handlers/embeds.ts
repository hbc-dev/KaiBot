import { Embed } from "@models/Embed";
import { Field } from "@models/Field";
import { DiscordClient } from "@modules/DiscordClient";
import { ResolvedAuthor, ResolvedEmbed, ResolvedFooter } from "@types";

function setAuthor(value: string): ResolvedAuthor {
    return { name: value };
}

function setFooter(value: string): ResolvedFooter {
    return { text: value };
}

export async function load_embeds(client: DiscordClient): Promise<void> {
    let embeds = await Embed.findAll();
    let fields = await Field.findAll();

    for (let embed of embeds) {
        const data = embed.toJSON();
        const cached = client.embeds.get(data.language) ?? [];
        const embedFields = fields.filter(field => {
            let fieldData = field.toJSON();
            
            return fieldData.embed_id == data.id && fieldData.language == data.language
        });

        let resolved: ResolvedEmbed = {
            title: data.title,
            id: data.id
        };
        
        if (data.author) resolved.author = setAuthor(data.author);
        if (data.description) resolved.description = data.description;
        if (data.footer) resolved.footer = setFooter(data.footer);

        if (embedFields.length > 0) resolved.fields = embedFields.map(field => field.toJSON());

        cached.push(resolved);
        client.embeds.set(data.language, cached);
    }
}