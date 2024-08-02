import { Command } from "@models/Command";
import { CommandLocalesLoaderOptions } from "@types";

export async function loadCmdLocales(options: CommandLocalesLoaderOptions): Promise<Command["dataValues"][] | null> {
    const { id, is_subcommand = false, parent_id = id } = options;

    const data = await Command.findAll({
        where: {
            is_subcommand,
            parent_id,
            id
        }
    });

    return data ? data.map(val => val.toJSON()) : null;
}