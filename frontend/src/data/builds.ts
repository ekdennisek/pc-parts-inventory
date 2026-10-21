import type { SavedBuild } from "../types";

export const builds: SavedBuild[] = [
    {
        id: "build-1773939455715",
        name: "År 2006",
        caseId: "case-3",
        motherboardId: "mb-3",
        cpuIds: ["cpu-19"],
        ramIds: ["ram-20", "ram-21"],
        powerSupplyId: "psu-5",
        graphicsCardIds: ["gpu-2"],
        storageIds: ["storage-4"],
        peripheralIds: ["p-1"],
    },
    {
        id: "build-1778776230325",
        name: "År 2004",
        caseId: "case-4",
        motherboardId: "mb-15",
        cpuIds: ["cpu-47"],
        ramIds: ["ram-49", "ram-50", "ram-51"],
        powerSupplyId: "psu-6",
        graphicsCardIds: ["gpu-7"],
        storageIds: ["storage-5"],
        // TODO DVD writer + floppy disk drive + fan controller
    },
    {
        id: "build-1792611298032",
        name: "År 1998",
        caseId: "case-5",
        motherboardId: "mb-22",
        cpuIds: ["cpu-71"],
        ramIds: ["ram-66", "ram-67"],
        powerSupplyId: "psu-1",
        graphicsCardIds: ["gpu-12"],
        storageIds: ["storage-6"],
        // TODO CD writer + floppy disk drive
    },
];

export const usedPartIds: Set<string> = new Set(
    builds
        .flatMap((build) => [
            build.caseId,
            build.motherboardId,
            build.powerSupplyId,
            ...build.cpuIds,
            ...build.ramIds,
            ...(build.graphicsCardIds ?? []),
            ...(build.storageIds ?? []),
            ...(build.peripheralIds ?? []),
        ])
        .filter((id): id is string => id !== undefined),
);
