import { Client, ClientOptions, Collection } from "discord.js";
import { CommandCache, EmbedCache, LocalizationCache, ButtonCache, MenuCache, ComponentCache, ModalCache, ServerMessagesCache } from "@types";
import { AccountManager } from "./AccountManager";

export class DiscordClient extends Client {
    public commands: CommandCache = new Collection();
    public localization: LocalizationCache = new Collection();
    public serverMessages: ServerMessagesCache = new Collection();
    public embeds: EmbedCache = new Collection();
    public buttons: ButtonCache = new Collection();
    public menus: MenuCache = new Collection();
    public modals: ModalCache = new Collection();
    public components: ComponentCache = new Collection();// Funcionality only
    public accounts: AccountManager = new AccountManager();

    constructor(options: ClientOptions) {
        super(options);
    }
}