import type { AnyPart, AnyWishlistPart, PartType } from "../types";

type KeysOfUnion<T> = T extends unknown ? keyof T : never;
export type WishlistField = KeysOfUnion<AnyWishlistPart>;

const fieldLabels: Record<WishlistField, string> = {
    name: "Name",
    brand: "Brand",
    description: "Description",
    releaseYear: "Release Year",
    condition: "Condition",
    box: "Original Box",
    cores: "Cores",
    threads: "Threads",
    baseClock: "Base Clock",
    boostClock: "Boost Clock",
    socket: "Socket",
    tdp: "TDP",
    codename: "Codename",
    partNumber: "Part Number",
    sSpec: "sSpec",
    formFactor: "Form Factor",
    chipset: "Chipset",
    memorySlots: "Memory Slots",
    memoryTypes: "Memory Type",
    maxMemory: "Max Memory",
    expansionSlots: "Expansion Slots",
    ioShield: "I/O Shield",
    wattage: "Wattage",
    efficiency: "Efficiency",
    modular: "Modular",
    series: "Series",
    memory: "Memory",
    memoryType: "Memory Type",
    coreClock: "Core Clock",
    powerConsumption: "Power",
    interface: "Interface",
    pciId: "PCI ID",
    capacity: "Capacity",
    type: "Type",
    speed: "Speed",
    timings: "Timings",
    voltage: "Voltage",
    supportedFormFactors: "Form Factors",
    external525Drives: '5.25" Bays',
    external35Drives: '3.5" Bays',
    glassPanel: "Glass Panel",
    readSpeed: "Read Speed",
    writeSpeed: "Write Speed",
    rpm: "RPM",
};

const fieldUnits: Partial<Record<WishlistField, string>> = {
    baseClock: "GHz",
    tdp: "W",
    maxMemory: "GB",
    wattage: "W",
    memory: "GB",
    coreClock: "MHz",
    powerConsumption: "W",
    capacity: "GB",
    speed: "MT/s",
    voltage: "V",
    readSpeed: "MB/s",
    writeSpeed: "MB/s",
};

/**
 * A part matches when every field the wish sets matches: plain values must be equal,
 * lists (e.g. memory types) must contain every wished value, and slot counts must be
 * at least the wished amount.
 */
export function matchesWish(part: AnyPart, wish: AnyWishlistPart): boolean {
    const partFields = part as unknown as Record<string, unknown>;
    return Object.entries(wish).every(([field, wanted]) => {
        if (wanted === undefined) return true;
        const actual = partFields[field];
        if (Array.isArray(wanted)) {
            return Array.isArray(actual) && wanted.every((value) => actual.includes(value));
        }
        if (typeof wanted === "object") {
            const counts = (actual ?? {}) as Record<string, number>;
            return Object.entries(wanted as Record<string, number>).every(
                ([slot, count]) => (counts[slot] ?? 0) >= count,
            );
        }
        return actual === wanted;
    });
}

/** The fields used by any of the wishes, in the order they first appear */
export function getWishlistFields(wishes: AnyWishlistPart[]): WishlistField[] {
    const fields = new Set<WishlistField>();
    for (const wish of wishes) {
        for (const [field, value] of Object.entries(wish)) {
            if (value !== undefined) fields.add(field as WishlistField);
        }
    }
    return [...fields];
}

export function getWishlistFieldLabel(field: WishlistField): string {
    return fieldLabels[field];
}

export function formatWishlistValue(
    partType: PartType,
    field: WishlistField,
    value: unknown,
): string {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object" && value !== null) {
        return Object.entries(value)
            .map(([slot, count]) => `${count}× ${slot}`)
            .join(", ");
    }
    if (field === "condition") return value === "working" ? "Working" : "Defective";
    // CPU clocks are in GHz, GPU clocks in MHz
    const unit = field === "boostClock" ? (partType === "cpu" ? "GHz" : "MHz") : fieldUnits[field];
    return unit ? `${value} ${unit}` : String(value);
}
