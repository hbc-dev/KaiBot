import { Modal } from "@models/Modal";
import { ModalTextInput } from "@models/ModalTextInput";
import { DiscordClient } from "@modules/DiscordClient";
import { ResolvedModal, ResolvedModalOption, languages } from "@types";

async function resolveOptions(modal_id: string, language: languages): Promise<ResolvedModalOption[]> {
    const options: ResolvedModalOption[] = [];
    const locales = await ModalTextInput.findAll({
        where: { modal_id, language }
    });

    for (let local of locales) {
        const data = local.toJSON();
        const resolved: ResolvedModalOption = {
            id: data.id,
            style: data.style,
            label: data.label,
            modal_id: data.modal_id,
            required: data.required ?? false,
            min_length: data.min_length ?? 0,
            max_length: data.max_length ?? 4000
        }

        if (data.placeholder) resolved.placeholder = data.placeholder;
        if (data.value) resolved.value = data.value;

        options.push(resolved);
    }

    return options;
}

export async function load_modals(client: DiscordClient): Promise<void> {
    const locales = await Modal.findAll();

    for (let local of locales) {
        const data = local.toJSON();
        const cached = client.modals.get(data.language) ?? [];
        const resolved: ResolvedModal = {
            id: data.id,
            title: data.title,
            options: await resolveOptions(data.id, data.language)
        }

        cached.push(resolved);
        client.modals.set(data.language, cached);
    }
}