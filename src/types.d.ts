import { APIButtonComponent, APIStringSelectComponent, ActionRowModalData, ButtonComponent, ButtonInteraction, CacheType, ChatInputCommandInteraction, Collection, CommandInteractionOptionResolver, Message, ModalSubmitFields, ModalSubmitInteraction, SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandIntegerOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandUserOption, StringSelectMenuComponent, StringSelectMenuInteraction } from "discord.js";
import { Command } from "@modules/Command";
import { SubCommand } from "@modules/SubCommand";
import { CommandManager } from "@modules/CommandManager";
import { DiscordClient } from "@modules/DiscordClient";
import { Button, Modal, Embed, Message as MessageID, SelectMenu } from "@enums";

export type RegularObject = Record<string, any>;
export type languages = "es-ES" | "en-US" | "fr";

// Command
export type CommandOptions = Omit<CommandInteractionOptionResolver<CacheType>,"getMessage" | "getFocused">;
export type CommandOptionTypes = SlashCommandAttachmentOption | SlashCommandBooleanOption | SlashCommandChannelOption | SlashCommandIntegerOption | SlashCommandMentionableOption | SlashCommandNumberOption | SlashCommandUserOption | SlashCommandRoleOption | SlashCommandStringOption

interface CommandActionOptions<L extends boolean> {
    client: DiscordClient;
    interaction: ChatInputCommandInteraction;
    command_options: CommandOptions;
    command: Command | SubCommand;
    language: languages;
    // account: L extends false ? AccountData : AccountData | null;
}

export type CommandAction<L extends boolean>
= (options: CommandActionOptions<L>) => void;

// CommandManager
export type CommandManagerData = {
	[K in keyof CommandManager]: CommandManager[K] extends (undefined | infer U) ? U : CommandManager[K];
};

// DiscordClient
export type CommandCache = Collection<string, Command>;
export type LocalizationCache = Collection<languages, Localization[]>;
export type ServerMessagesCache = Collection<languages, ServerMessages[]>;
export type EmbedCache = Collection<string, ResolvedEmbed[]>;
export type ButtonCache = Collection<string, ResolvedButton[]>;
export type MenuCache = Collection<string, ResolvedMenu[]>;
export type ModalCache = Collection<string, ResolvedModal[]>;
export type ComponentCache = Collection<string, ResolvedComponent>;// idk wtf is ResolvedComponent fr

export interface Localization {
    id: string;
    language: languages;
    value: string;
    created_at: Date;
    updated_at: Date;
}

// EmbedBuilder
export interface EmbedBuilderOptions {
    id?: Embed;
    client: DiscordClient;
    language?: languages;
}

// Event
export type EventAction = (client: DiscordClient, ...args: any) => void;

export interface EventOptions {
    name?: string;
    once?: boolean;
    execute?: EventAction;
    disable?: boolean;
}

// SubCommand
export type SubCommandAction<L extends boolean> =
(options: SubCommandActionOptions<L>) => void;

interface SubCommandActionOptions<L extends boolean> {
    client: DiscordClient;
    interaction: ChatInputCommandInteraction;
    command_options: CommandOptions;
    command: Command | SubCommand;
    language: languages;
    // account: L extends true ? AccountData : AccountData | null;
}

// Button
export type ButtonAction<L extends boolean> =
(options: ButtonActionOptions<L>) => void;

interface ButtonActionOptions<L extends boolean> {
    client: DiscordClient;
    interaction: ButtonInteraction;
    language: languages;
    button_id: string;
    component: APIButtonComponent | ButtonComponent;
    message: Message;
    account: L extends true ? AccountData : AccountData | null;
    button: ResolvedButtonComponent | null;
}

// SelectMenu
export type SelectMenuAction<L extends boolean> =
(options: SelectMenuActionOptions<L>) => void;

interface SelectMenuActionOptions<L extends boolean> {
    client: DiscordClient;
    interaction: StringSelectMenuInteraction;
    language: languages;
    menu_id: string;
    values: string[];
    component: APIStringSelectComponent | StringSelectMenuComponent;
    message: Message;
    account: L extends true ? AccountData : AccountData | null;
    menu: ResolvedMenuComponent | null;
}

// MessageBuilder
export interface MessageOptions {
    client: DiscordClient;
    id?: MessageTypes;
    language?: languages;
}

export type MessageTypes = MessageID;

// ButtonBuilder
export interface ButtonBuilderOptions {
    client: DiscordClient;
    id?: Button;
    language?: languages;
}

// SelectMenuBuilder
export interface SelectMenuBuilderOptions {
    client: DiscordClient;
    id?: SelectMenu;
    language?: languages;
}

// Modal
export type ModalAction<L extends boolean> =
(options: ModalActionOptions<L>) => void;

export interface ModalActionOptions<L extends boolean> {
    client: DiscordClient;
    interaction: ModalSubmitInteraction;
    language: languages;
    modal_id: string;
    fields: ModalSubmitFields;
    components: ActionRowModalData[];
    message: Message | null;
    account: L extends true ? AccountData : AccountData | null;
    modal: ResolvedModalComponent | null;
}

// ModalBuilder
export interface ModalBuilderOptions {
    client: DiscordClient;
    id?: Modal;
    language?: languages;
}

// utils/locales.command
export type RawLocales = Partial<Record<languages, CommandLocales>>;
export type ResolvedLocales = Partial<Record<languages, string>>;

export type CommandLocales = Omit<CommandLocaleSchema, "locales" | "options" | "subcommands">;

export type CommandOptionSchema = Record<string, Omit<CommandLocaleSchema, "options">>;
export type SubCommandSchema = Omit<CommandLocaleSchema, "options" | "subcommands">;

interface CommandLocaleSchema {
    name: string;
    description: string;
    locales: RawLocales;
    options: CommandOptionSchema;
    subcommands: Record<string, SubCommandSchema>;
}

// utils/locales.options
interface CommandOptionGetterData {
    names: ResolvedLocales;
    descriptions: ResolvedLocales;
}

// utils/loadCmdLocales
export interface CommandLocalesLoaderOptions {
    id: string;
    parent_id?: string;
    is_subcommand?: boolean;
}

// utils/loadCmdOptionsLocales
export interface CommandOptionsLocalesLoaderOptions {
    command_id: string;
    cmd_parent_id?: string;
    is_subcommand?: boolean;
    id: string;
}

// utils/loadCmdOptionChoicesLocales
export interface CommandOptionChoicesLocalesLoaderOptions {
    option_id: string;
    cmd_parent_id?: string,
    command_id: string,
    is_subcommand?: boolean
}

export interface Choice<T extends string | number> {
    name: string;
    value: T;
    name_localizations: Partial<Record<languages, string>>;
}

// handlers/embeds
export interface ResolvedAuthor {
    name: string;
}

export interface ResolvedFooter {
    text: string;
}

export interface ResolvedEmbed {
    id: string;
    title: string;
    author?: ResolvedAuthor;
    description?: string;
    footer?: ResolvedFooter;
    fields?: Field[];
}

// handlers/buttons
export interface ResolvedButton {
    id: string;
    disabled: boolean;
    emoji?: string;
    label?: string;
    style: number;
    url?: string;
}

// handlers/menus
export interface ResolvedMenu {
    id: string;
    disabled: boolean;
    maxValue: number;
    minValues: number;
    placeholder?: string;
    options: ResolvedMenuOption[];  
}

export interface ResolvedMenuOption {
    value: string;
    default: boolean;
    description?: string;
    emoji?: string;
    label: string;
}

// handlers/modals
export interface ResolvedModal {
    id: string;
    title: string;
    options: ResolvedModalOption[];
}

export interface ResolvedModalOption {
    id: string;
    style: 1 | 2;
    label: string;
    value?: string;
    modal_id: string;
    required: boolean;
    min_length: number;
    max_length: number;
    placeholder?: string;
}

// handlers/components
export interface ResolvedBaseComponent {
    execute: () => void;
    admin: boolean;
    version: string;
    type: string;
    requiredAccount: boolean;
}

export interface ResolvedButtonComponent extends ResolvedBaseComponent {
    execute: ButtonAction;
}

export interface ResolvedMenuComponent extends ResolvedBaseComponent {
    execute: SelectMenuAction;
}

export interface ResolvedModalComponent extends ResolvedBaseComponent {
    execute: ModalAction;
}
