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
    ])
    .filter((id): id is string => id !== undefined),
);
