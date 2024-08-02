import { ModalAction, ResolvedModalComponent } from "../types";

export class Modal<T extends boolean> {
    public execute: ModalAction<boolean> = () => {};
    public admin: boolean = false;
    public version: string = "0.0.0";
    public type: string = "modal";
    public requiredAccount: boolean = false;

    setFunction(callback: ModalAction<T>): Modal<T> {
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

    requireAccount<R extends boolean>(value: R): Modal<R> {
        this.requiredAccount = value;
        return this as Modal<boolean>;
    }

    toJSON(): ResolvedModalComponent {
        return { ...this }
    }
}