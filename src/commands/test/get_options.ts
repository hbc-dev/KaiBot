import { ChannelType, ColorResolvable, SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandUserOption } from "discord.js";
import { Command } from "@modules/Command";
import { get_options } from "../locales.json";
import { Embed as EmbedID } from "@enums";
import { Embed } from "@modules/EmbedBuilder";

const { options: cmd_options } = get_options;

// OPTIONS
const thumbnailOption = new SlashCommandAttachmentOption()
.setName(cmd_options.thumbnail.name)
.setDescription(cmd_options.thumbnail.description);

const authorOption = new SlashCommandBooleanOption()
.setName(cmd_options.author.name)
.setDescription(cmd_options.author.description);

const colorOption = new SlashCommandStringOption()
.setName(cmd_options.color.name)
.setDescription(cmd_options.color.description);

const descriptionOption = new SlashCommandStringOption()
.setName(cmd_options.description.name)
.setDescription(cmd_options.description.description)
.setMaxLength(4096);

const titleOption = new SlashCommandStringOption()
.setName(cmd_options.title.name)
.setDescription(cmd_options.title.description)
.setMaxLength(256)
.setRequired(true);

const channelOption = new SlashCommandChannelOption()
.setName(cmd_options.channel.name)
.setDescription(cmd_options.channel.description)
.addChannelTypes(ChannelType.GuildText);

const userOption = new SlashCommandUserOption()
.setName(cmd_options.user.name)
.setDescription(cmd_options.user.description);

const roleOption = new SlashCommandRoleOption()
.setName(cmd_options.role.name)
.setDescription(cmd_options.role.description);

// idk what this function do fr
const mentionOption = new SlashCommandMentionableOption()
.setName(cmd_options.mention.name)
.setDescription(cmd_options.mention.description);

const footerOption = new SlashCommandStringOption()
.setName(cmd_options.footer.name)
.setDescription(cmd_options.footer.description);

const imageOption = new SlashCommandAttachmentOption()
.setName(cmd_options.image.name)
.setDescription(cmd_options.image.description);

export const options = [
	titleOption,
	thumbnailOption,
	authorOption,
	colorOption,
	descriptionOption,
	channelOption,
	userOption,
	roleOption,
	mentionOption,
	footerOption,
	imageOption
];

export const command = new Command()
.setName(get_options.name)
.setDescription(get_options.description)
.setVersion("2.0.0")
.setFunction(async ({ interaction, command_options, client, language }) => {
	const title = <string>command_options.getString(cmd_options.title.name);
	const thumbnail = command_options.getAttachment(cmd_options.thumbnail.name);
	const author = command_options.getBoolean(cmd_options.author.name);
	const color = command_options.getString(cmd_options.color.name);
	const description = command_options.getString(cmd_options.description.name);
	const channel = command_options.getChannel(cmd_options.channel.name)
	const user = command_options.getUser(cmd_options.user.name);
	const role = command_options.getRole(cmd_options.role.name);
	const mention = command_options.getMentionable(cmd_options.mention.name);
	const footer = command_options.getString(cmd_options.footer.name);
	const image = command_options.getAttachment(cmd_options.image.name);

	const authorIconURL = author ? interaction.user.avatarURL() ?? undefined : undefined;

	const embed = new Embed({ client, language })
	.setId(EmbedID.GetOptions)
	.setImage(image?.url)
	.setThumbnail(thumbnail?.url)
	.setColor(<ColorResolvable>color ?? "Random")
	.setAuthorIconURL(authorIconURL)
	.addVar("role", role?.name)
	.addVar("user", user?.username)
	.addVar("channel", channel?.name)
	.addVar("mention", mention?.toString())
	.addVar("author", author ? interaction.user.username : null)
	.addVar("title", title)
	.addVar("footer", footer)
	.addVar("description", description);

	return interaction.reply({ embeds: [ embed.resolve() ] });
});