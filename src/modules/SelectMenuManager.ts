import { APIStringSelectComponent, GuildMemberRoleManager, Message, StringSelectMenuComponent, StringSelectMenuInteraction } from "discord.js";
import { DiscordClient } from "./DiscordClient";
import { ResolvedMenuComponent, languages } from "@types";
import { Message as MessageBuilder } from "./MessageBuilder";
import { Message as MessageID } from "@enums";

export class SelectMenuManager {
	public interaction: StringSelectMenuInteraction;
	public client: DiscordClient;
	public language: languages;
    public menu_id: string;
    public values: string[];
    public component: APIStringSelectComponent | StringSelectMenuComponent;
    public message: Message;
	public menu: ResolvedMenuComponent | null = null;

	constructor(client: DiscordClient, interaction: StringSelectMenuInteraction) {
		this.interaction = interaction;
		this.client = client;
        this.menu_id = interaction.customId;
        this.component = interaction.component;
        this.message = interaction.message;
        this.values = interaction.values;

		let AVAILABLE_LANGUAGES = process.env.AVAILABLE_LANGUAGES;
		let DEFAULT_LANGUAGE = <languages>process.env.DEFAULT_LANGUAGES;
		let DISCORD_LOCALE = <languages>interaction.locale;

		this.language = AVAILABLE_LANGUAGES?.includes(DISCORD_LOCALE) ? DISCORD_LOCALE : DEFAULT_LANGUAGE;

		this.handleMenuInteraction();
	}

	checkIfMenuExists(): boolean {
		const path = `menus:${this.menu_id}`;
		const menu = this.client.components.get(path);

		if (!menu) return false;
		else {
			this.menu = menu;
			return true;
		};
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

	async handleMenuInteraction() {
		this.checkIfMenuExists();

		if (!this.menu) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.MenuNotFound)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		const { admin, execute } = this.menu;

		if (admin && !this.hasAdmin()) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.AdminMenu)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		execute({ ...this });
	}
}