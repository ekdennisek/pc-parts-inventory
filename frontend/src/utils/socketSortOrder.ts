import type { CpuSocket } from "../data/sockets";
import { intelSockets, amdSockets } from "../data/sockets";

/** Intel sockets, then AMD. Sockets used by both go with the given CPU brand, Intel when unknown. */
export const getSocketSortOrder = (socket: CpuSocket, brand?: string): number => {
    const amd = amdSockets.get(socket);
    if (amd && brand === "AMD") return intelSockets.size + amd.sorting;
    const intel = intelSockets.get(socket);
    if (intel) return intel.sorting;
    if (amd) return intelSockets.size + amd.sorting;
    return intelSockets.size + amdSockets.size;
};
