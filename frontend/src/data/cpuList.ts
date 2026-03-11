import { amdCpus } from "./cpus/amd";
import { intelCpus } from "./cpus/intel";
import type { CpuSocket } from "./sockets";

export interface MasterdataCpu {
  name: string;
  partNumber?: string;
  sSpec?: string;
  partNumbers?: string[];
  stepping?: string;
  note?: string;
}

export interface CpuGroup {
  brand: "Intel" | "AMD";
  socket: CpuSocket;
  codename: string;
  cpus: MasterdataCpu[];
}

function groupAmdByCodename(entries: typeof amdCpus): CpuGroup[] {
  const groups: CpuGroup[] = [];
  const seen = new Map<string, CpuGroup>();

  for (const entry of entries) {
    const key = `${entry.socket}|${entry.codeName}`;
    let group = seen.get(key);
    if (!group) {
      group = {
        brand: "AMD",
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

function groupIntelByCodename(entries: typeof intelCpus): CpuGroup[] {
  const groups: CpuGroup[] = [];
  const seen = new Map<string, CpuGroup>();

  for (const entry of entries) {
    const key = `${entry.socket}|${entry.codeName}`;
    let group = seen.get(key);
    if (!group) {
      group = {
        brand: "Intel",
        socket: entry.socket,
        codename: entry.codeName,
        cpus: [],
      };
      seen.set(key, group);
      groups.push(group);
    }
    group.cpus.push({
      name: entry.name,
      sSpec: entry.sSpec,
      partNumbers: entry.partNumbers,
      stepping: entry.stepping,
      note: entry.note,
    });
  }

  return groups;
}

const amdGroups = groupAmdByCodename(amdCpus);
const intelGroups = groupIntelByCodename(intelCpus);

export const cpuList: CpuGroup[] = [...amdGroups, ...intelGroups];
