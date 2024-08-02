import { APIButtonComponent, ButtonComponent, ButtonInteraction, GuildMemberRoleManager, Message } from "discord.js";
import { DiscordClient } from "./DiscordClient";
import { ResolvedButtonComponent, languages } from "@types";
import { Message as MessageBuilder } from "./MessageBuilder";
import { Message as MessageID } from "@enums";

export class ButtonManager {
	public interaction: ButtonInteraction;
	public client: DiscordClient;
	public language: languages;
    public button_id: string;
    public component: APIButtonComponent | ButtonComponent;
    public message: Message;
	public button: ResolvedButtonComponent | null = null;

	constructor(client: DiscordClient, interaction: ButtonInteraction) {
		this.interaction = interaction;
		this.client = client;
        this.button_id = interaction.customId;
        this.component = interaction.component;
        this.message = interaction.message;

		let AVAILABLE_LANGUAGES = process.env.AVAILABLE_LANGUAGES;
		let DEFAULT_LANGUAGE = <languages>process.env.DEFAULT_LANGUAGES;
		let DISCORD_LOCALE = <languages>interaction.locale;

		this.language = AVAILABLE_LANGUAGES?.includes(DISCORD_LOCALE) ? DISCORD_LOCALE : DEFAULT_LANGUAGE;

		this.handleButtonInteraction();
	}

	checkIfButtonExists(): boolean {
		const path = `buttons:${this.button_id}`;
		const button = this.client.components.get(path);

		if (!button) return false;
		else {
			this.button = button;
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

	async handleButtonInteraction() {
		this.checkIfButtonExists();

		if (!this.button) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.ButtonNotFound)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		};

		const { admin, execute } = this.button;

		if (admin && !this.hasAdmin()) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.AdminButton)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		execute({ ...this });
	}
}