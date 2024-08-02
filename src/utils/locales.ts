import { CommandLocaleSchema, CommandOptionGetterData, ResolvedLocales } from "@types";
import * as locales from "../commands/locales.json";

export function getNameLocalizations(command: string): ResolvedLocales {
    let commandData: CommandLocaleSchema = locales[command];
    let localizations = {};

    if (!commandData) throw new Error(`Invalid command name localizations: ${command}`);

    for (let locale of Object.keys(commandData.locales)) {
        let name: string | undefined = commandData.locales[locale]?.name;

        if (!name) continue;

        localizations[locale] = name;
    }

    return localizations;
}

export function getSubNameLocalizations(command: string, subcommand: string) {
    let commandData: CommandLocaleSchema = locales[command];
    let localizations = {};

    if (!commandData) throw new Error(`Invalid command name localizations: ${command}`);

    let { subcommands = {} } = commandData;
    let subCommandData = subcommands[subcommand];


    if (!subCommandData) throw new Error(`Invalid sub command name localizations: ${subcommand}`);

    for (let locale of Object.keys(subCommandData.locales)) {
        let name: string | undefined = subCommandData.locales[locale]?.name;

        if (!name) continue;

        localizations[locale] = name;
    }

    return localizations;
}

export function getSubDescriptionLocalizations(command: string, subcommand: string) {
    let commandData: CommandLocaleSchema = locales[command];
    let localizations = {};

    if (!commandData) throw new Error(`Invalid command name localizations: ${command}`);

    let { subcommands = {} } = commandData;
    let subCommandData = subcommands[subcommand];

    if (!subCommandData) throw new Error(`Invalid sub command name localizations: ${subcommand}`);

    for (let locale of Object.keys(subCommandData.locales)) {
        let description: string | undefined = subCommandData.locales[locale]?.description;

        if (!description) continue;

        localizations[locale] = description;
    }

    return localizations;
}

export function getDescriptionLocalizations(command: string): ResolvedLocales {
    let commandData: CommandLocaleSchema = locales[command];
    let localizations = {};

    if (!commandData) throw new Error(`Invalid command description localizations: ${command}`);

    for (let locale of Object.keys(commandData.locales)) {
        let description: string | undefined = commandData.locales[locale]?.description;

        if (!description) continue;

        localizations[locale] = description;
    }

    return localizations;
}

export function getCommandOptionLocalizations(command: string, option: string): CommandOptionGetterData {
    let commandData: CommandLocaleSchema = locales[command];
    let localizations = { names: {}, descriptions: {} };

    if (!commandData) throw new Error(`Invalid command options localizations: ${command}`);
    if (!commandData.options) throw new Error(`This command doesn't have defined options: ${command}`);
    if (!commandData.options[option]) throw new Error(`The option ${option} in the command ${command} doesn't have definitions`);
    if (!commandData.options[option].locales) throw new Error(`The option ${option} in the command ${command} doesn't have locale definitions`);

    let commandLocales = commandData.options[option].locales;

    for (let locale of Object.keys(commandLocales)) {
        let name = commandLocales[locale].name;
        let description = commandLocales[locale].description;

        if (name) localizations.names[locale] = name;
        if (description) localizations.descriptions[locale] = description;
    }

    return localizations;
}