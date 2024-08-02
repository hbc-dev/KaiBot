export function resolveText(text: string, map: Map<string, string | null | undefined>): string {
    for (let key of map.keys()) {
        let value = map.get(key) ?? "";
        let regex = new RegExp(`(?:\{)${key}(?:\})`, "gm");

        text = text.replaceAll(regex, value);
    }

    return text;
}