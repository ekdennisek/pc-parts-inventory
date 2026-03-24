import type { CpuSocket } from "../data/sockets";
import { intelSockets, amdSockets } from "../data/sockets";

export const getSocketSortOrder = (socket: CpuSocket): number => {
  const intel = intelSockets.get(socket);
  if (intel) return intel.sorting;
  const amd = amdSockets.get(socket);
  if (amd) return intelSockets.size + amd.sorting;
  return intelSockets.size + amdSockets.size;
};
