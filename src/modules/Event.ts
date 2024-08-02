import { Events } from "discord.js";
import { EventAction, EventOptions } from "../types";

export class Event {
    public name: string = "";
    public once: boolean = false;
    public execute: EventAction = () => {};
    public disabled: boolean = false;

    constructor(options?: EventOptions) {
        if (options?.name) this.name = options.name;
        if (options?.once) this.once = options.once;
        if (options?.execute) this.execute = options.execute;
        if (options?.disable) this.disabled = options.disable;
    }

    setFunction(callback: EventAction): this {
        this.execute = callback;
        return this;
    }

    setName(name: Events): this {
        this.name = name;
        return this;
    }

    setOnce(value: boolean): this {
        this.once = value;
        return this;
    }

    setDisable(value: boolean): this {
        this.disabled = value;
        return this;
    }
}