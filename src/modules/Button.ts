import { ButtonAction, ResolvedButtonComponent } from "../types";

export class Button<T extends boolean = false> {
    public execute: ButtonAction<boolean> = () => {};
    public admin: boolean = false;
    public version: string = "0.0.0";
    public type: string = "button";
    public requiredAccount: boolean = false;

    setFunction(callback: ButtonAction<T>): Button<T> {
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

    requireAccount<R extends boolean>(value: R): Button<R> {
        this.requiredAccount = value;
        return this as Button<boolean>;
    }

    toJSON(): ResolvedButtonComponent {
        return { ...this }
    }
}