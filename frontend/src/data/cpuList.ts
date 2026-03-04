import type { CpuSocket } from "../types";
import { amdCpus } from "./cpus/amd";

export interface MasterdataCpu {
  name: string;
  partNumber: string;
  stepping?: string;
  note?: string;
}

export interface CpuGroup {
  brand: "Intel" | "AMD";
  socket: CpuSocket;
  codename: string;
  cpus: MasterdataCpu[];
}

function groupByCodename<
  T extends {
    codeName: string;
    socket: CpuSocket;
    name: string;
    partNumber: string;
    stepping?: string;
    note?: string;
  },
>(entries: T[], brand: "Intel" | "AMD"): CpuGroup[] {
  const groups: CpuGroup[] = [];
  const seen = new Map<string, CpuGroup>();

  for (const entry of entries) {
    const key = `${entry.socket}|${entry.codeName}`;
    let group = seen.get(key);
    if (!group) {
      group = {
        brand,
        socket: entry.socket,
        codename: entry.codeName,
        cpus: [],
      };
      seen.set(key, group);
      groups.push(group);
    }
    group.cpus.push({
      name: entry.name,
      partNumber: entry.partNumber,
      stepping: entry.stepping,
      note: entry.note,
    });
  }

  return groups;
}

const amdGroups = groupByCodename(amdCpus, "AMD");

export const cpuList: CpuGroup[] = [...amdGroups];
