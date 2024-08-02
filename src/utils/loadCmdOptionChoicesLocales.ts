import { Choice, CommandOptionChoicesLocalesLoaderOptions } from "@types";
import { CommandOptionChoice } from "@models/CommandOptionChoice";

export async function loadCmdOptionChoicesLocales<T extends string | number>(options: CommandOptionChoicesLocalesLoaderOptions): Promise<Choice<T>[] | null> {
    const { option_id, command_id, cmd_parent_id = command_id, is_subcommand = false } = options;

    const data = await CommandOptionChoice.findAll({
        where: {
            option_id,
            command_id,
            cmd_parent_id,
            is_subcommand
        }
    });

    const normalizedData = data.map(val => val.toJSON())
    const filteredData = normalizedData.filter(val => val.language == "en-US");
    const normalizedChoices: Choice<T>[] = [];

    for (const data of filteredData) {
        const value = data.type == "INTEGER" ? parseInt(data.value) : data.value; 
        const locales = normalizedData
        .filter(val => val.id == data.id && val.option_id == data.option_id)
        .map(({ language, name }) => ({ language, name }));
        const name_localizations = {};

        for (const locale of locales) {
            name_localizations[locale.language] = locale.name;
        }

        const choice: Choice<T> = { name: data.name, name_localizations, value: value as T };
        
        normalizedChoices.push(choice);
    }

    return normalizedChoices.length > 0 ? normalizedChoices : null;
}