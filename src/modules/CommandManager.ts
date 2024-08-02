import { ChatInputCommandInteraction, GuildMemberRoleManager } from "discord.js";
import { DiscordClient } from "./DiscordClient";
import { Command } from "./Command";
import { SubCommand } from "./SubCommand";
import { CommandManagerData, CommandOptions, languages } from "@types";
import { Message } from "./MessageBuilder";
import { Message as MessageID } from "@enums";

export class CommandManager {
	public interaction: ChatInputCommandInteraction;
	public client: DiscordClient;
	public command: Command | SubCommand | undefined;
	public command_options: CommandOptions;
	public language: languages;

	constructor(client: DiscordClient, interaction: ChatInputCommandInteraction) {
		this.interaction = interaction;
		this.client = client;
		this.command_options = interaction.options;

		const AVAILABLE_LANGUAGES = process.env.AVAILABLE_LANGUAGES;
		const DEFAULT_LANGUAGE = <languages>process.env.DEFAULT_LANGUAGES;
		const DISCORD_LOCALE = <languages>interaction.locale;

		this.language = AVAILABLE_LANGUAGES?.includes(DISCORD_LOCALE) ? DISCORD_LOCALE : DEFAULT_LANGUAGE;
		
		this.handleCommandInteraction();
	}

	/**
	 * Check if the command really exists
	 */
	checkIfCommandExists(): boolean {
		let command = this.client.commands.get(this.interaction.commandName);
		this.command = command;
		
		try {
			let subcommand = this.command_options.getSubcommand();

			if (subcommand && command?.options) {
				this.command = <SubCommand>command.options.find(x => x.toJSON().name == subcommand);
			}
		} finally {
			if (!command) return false;
      		else return true;
		}
	}

	/**
	 * Check if the user has permissions to use this command
	 */
	hasAdmin(): boolean {
		if (this.interaction.member?.roles instanceof GuildMemberRoleManager) {
			if (this.interaction.member.roles.cache.has(process.env.TEAM_ROLE_ID ?? "")) return true;
		}

		return false;
	}

	async handleCommandInteraction() {
		this.checkIfCommandExists();

		// COMMAND_NOT_FOUND
		if (!this.command) {
			const message = new Message({ client: this.client })
			.setId(MessageID.CommandNotFound)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		const { disabled, execute, admin } = this.command;

		// COMMAND_DISABLED
		if (disabled) {
			const message = new Message({ client: this.client })
			.setId(MessageID.CommandDisabled)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		};

		// ADMIN_COMMAND
		if (admin && !this.hasAdmin()) {
			const message = new Message({ client: this.client })
			.setId(MessageID.AdminCommand)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		execute(<CommandManagerData>{ ...this });
	}
}