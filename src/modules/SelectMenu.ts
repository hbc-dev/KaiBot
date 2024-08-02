import { ResolvedMenuComponent, SelectMenuAction } from "../types";

export class SelectMenu<T extends boolean = false> {
    public execute: SelectMenuAction<boolean> = () => {};
    public admin: boolean = false;
    public version: string = "0.0.0";
    public type: string = "menu";
    public requiredAccount: boolean = false;

    setFunction(callback: SelectMenuAction<T>): SelectMenu<T> {
        this.execute = callback;
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

    requireAccount<R extends boolean>(value: R): SelectMenu<R> {
        this.requiredAccount = value;
        return this as SelectMenu<boolean>;
    }

    toJSON(): ResolvedMenuComponent {
        return { ...this }
    }
}