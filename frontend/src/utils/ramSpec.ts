import type { RAM } from "../types";

/** Sticks with the same key are considered similar: type, form factor, capacity and speed. */
export function getRamSpecKey(ram: RAM): string {
    return `${ram.type}|${ram.formFactor}|${ram.capacity}|${ram.speed}`;
}

export function getRamSpecLabel(specKey: string): string {
    const [type, formFactor, capacity, speed] = specKey.split("|");
    const formFactorLabel = formFactor === "DIMM" ? "" : ` ${formFactor}`;
    return `${type}${formFactorLabel} ${capacity} GB ${speed} MHz`;
}
