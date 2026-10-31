import type { PciId } from "../types";

function toHex(value: number): string {
    return value.toString(16).padStart(4, "0");
}

/** Formats as four 16-bit hex values, e.g. "1002 9501 1787 2244" */
export function formatPciId(pciId: PciId): string {
    return [pciId.vendorId, pciId.deviceId, pciId.subsystemVendorId, pciId.subsystemId]
        .map(toHex)
        .join(" ");
}
