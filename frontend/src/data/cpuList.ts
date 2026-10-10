import { getFirstRelease, type YearMonth } from "./codenames";
import { amdCpus } from "./cpus/amd";
import { intelCpus } from "./cpus/intel";
import { getProductLines } from "./productLines";
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
    // Undefined when the codename table has no entry for this socket and codename
    firstRelease?: YearMonth;
    cpus: MasterdataCpu[];
    // Derived from the CPU names, e.g. ["Athlon 64 X2", "Athlon 64"]
    productLines: string[];
}

type GroupedCpus = Omit<CpuGroup, "productLines">;

function groupAmdByCodename(entries: typeof amdCpus): GroupedCpus[] {
    const groups: GroupedCpus[] = [];
    const seen = new Map<string, GroupedCpus>();

    for (const entry of entries) {
        const key = `${entry.socket}|${entry.codeName}`;
        let group = seen.get(key);
        if (!group) {
            group = {
                brand: "AMD",
                socket: entry.socket,
                codename: entry.codeName,
                firstRelease: getFirstRelease(entry.socket, entry.codeName),
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

function groupIntelByCodename(entries: typeof intelCpus): GroupedCpus[] {
    const groups: GroupedCpus[] = [];
    const seen = new Map<string, GroupedCpus>();

    for (const entry of entries) {
        const key = `${entry.socket}|${entry.codeName}`;
        let group = seen.get(key);
        if (!group) {
            group = {
                brand: "Intel",
                socket: entry.socket,
                codename: entry.codeName,
                firstRelease: getFirstRelease(entry.socket, entry.codeName),
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

export const cpuList: CpuGroup[] = [...amdGroups, ...intelGroups].map((group) => ({
    ...group,
    productLines: getProductLines(group.cpus.map((entry) => entry.name)),
}));
