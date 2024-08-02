import { ApplicationCommandOptionType, SlashCommandSubcommandBuilder } from "discord.js";
import { CommandOptionTypes, SubCommandAction } from "../types";
import { loadCmdLocales } from "@utils/loadCmdLocales";
import { loadCmdOptionsLocales } from "@utils/loadCmdOptionsLocales";
import { loadCmdOptionChoicesLocales } from "@utils/loadCmdOptionChoicesLocales";

// thanks to DeadOce4n for the types!!
export class SubCommand<T extends boolean = false> extends SlashCommandSubcommandBuilder {
    public execute: SubCommandAction<boolean> = () => {};
    public disabled: boolean = false;
    public admin: boolean = false;
    public version: string = "0.0.0";
    public requiredAccount: boolean = false;

    setFunction(callback: SubCommandAction<T>): SubCommand<T> {
        this.execute = callback;
        return this;
    }

    setDisable(value: boolean): this {
        this.disabled = value;
        return this;
    }

    setAdmin(value: boolean): this {
        this.admin = value;
        return this;
    }

    setVersion(value: string): this {
        this.version = value;
        return this;
    }

    requireAccount<R extends boolean>(value: R): SubCommand<R> {
        this.requiredAccount = value;
        return this as SubCommand<boolean>;
    }

    async loadLocales(parent_id: string) {
        const data = await loadCmdLocales({
            parent_id,
            id: this.name,
            is_subcommand: true
        });

        if (data) {
            for (const value of data) {
                this.setNameLocalization(value.language, value.name ?? this.name);
                this.setDescriptionLocalization(value.language, value.description ?? this.description);
            }
        }
    }

    async loadOptionsLocales(options: CommandOptionTypes[], parent_id: string): Promise<void> {
        const queryData = {
            cmd_parent_id: parent_id,
            command_id: this.name,
            is_subcommand: true
        };

        for (const option of options) {
            const data = await loadCmdOptionsLocales({
                id: option.name,
                ...queryData
            });

            if (data) {
                for (const value of data) {
                    option.setNameLocalization(value.language, value.name ?? option.name);
                    option.setDescriptionLocalization(value.language, value.description ?? option.description);                

                    if ("setChoices" in option) {
                        if (ApplicationCommandOptionType.String == option.type) {
                            const choices = await loadCmdOptionChoicesLocales<string>({ option_id: option.name, ...queryData });

                            if (choices) option.setChoices(...choices);
                        } else {
                            const choices = await loadCmdOptionChoicesLocales<number>({ option_id: option.name, ...queryData });

                            if (choices) option.setChoices(...choices);
                        }
                    }
                }
            }

            if (option.type == ApplicationCommandOptionType.Attachment) this.addAttachmentOption(option);
            if (option.type == ApplicationCommandOptionType.Boolean) this.addBooleanOption(option);
            if (option.type == ApplicationCommandOptionType.Channel) this.addChannelOption(option);
            if (option.type == ApplicationCommandOptionType.Integer) this.addIntegerOption(option);
            if (option.type == ApplicationCommandOptionType.Mentionable) this.addMentionableOption(option);
            if (option.type == ApplicationCommandOptionType.Number) this.addNumberOption(option);
            if (option.type == ApplicationCommandOptionType.Role) this.addRoleOption(option);
            if (option.type == ApplicationCommandOptionType.String) this.addStringOption(option);
            if (option.type == ApplicationCommandOptionType.User) this.addUserOption(option);
        }
    }
}