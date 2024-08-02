import { ActionRowModalData, GuildMemberRoleManager, Message, ModalSubmitFields, ModalSubmitInteraction } from "discord.js";
import { DiscordClient } from "./DiscordClient";
import { ResolvedModalComponent, languages } from "@types";
import { Message as MessageBuilder } from "./MessageBuilder";
import { Message as MessageID } from "@enums";

export class ModalManager {
	public interaction: ModalSubmitInteraction;
	public client: DiscordClient;
	public language: languages;
    public modal_id: string;
    public fields: ModalSubmitFields;
    public components: ActionRowModalData[];
    public message: Message | null;
	public modal: ResolvedModalComponent | null = null;

	constructor(client: DiscordClient, interaction: ModalSubmitInteraction) {
		this.interaction = interaction;
		this.client = client;
        this.modal_id = interaction.customId;
        this.components = interaction.components;
        this.message = interaction.message;
        this.fields = interaction.fields;

		let AVAILABLE_LANGUAGES = process.env.AVAILABLE_LANGUAGES;
		let DEFAULT_LANGUAGE = <languages>process.env.DEFAULT_LANGUAGES;
		let DISCORD_LOCALE = <languages>interaction.locale;

		this.language = AVAILABLE_LANGUAGES?.includes(DISCORD_LOCALE) ? DISCORD_LOCALE : DEFAULT_LANGUAGE;

		this.handleMenuInteraction();
	}

	checkIfModalExists(): boolean {
		const path = `modals:${this.modal_id}`;
		const modal = this.client.components.get(path);

		if (!modal) return false;
		else {
			this.modal = modal;
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
		this.checkIfModalExists();

		if (!this.modal) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.ModalNotFound)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		const { admin, execute } = this.modal;

		if (admin && !this.hasAdmin()) {
			const message = new MessageBuilder({ client: this.client })
			.setId(MessageID.AdminModal)
			.setLanguage(this.language);

			return this.interaction.reply({
				content: message.resolve(),
				ephemeral: true
			});
		}

		execute({ ...this });
	}
}