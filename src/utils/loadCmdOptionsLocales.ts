import { CommandOptionsLocalesLoaderOptions } from "@types";
import { CommandOption } from "@models/CommandOption";

export async function loadCmdOptionsLocales(options: CommandOptionsLocalesLoaderOptions): Promise<CommandOption["dataValues"][] | null> {
    const { command_id, id, is_subcommand = false, cmd_parent_id = command_id } = options;

    const data = await CommandOption.findAll({
        where: {
            command_id,
            cmd_parent_id,
            id,
            is_subcommand
        }
    });

    return data ? data.map(val => val.toJSON()) : null;
}