import type { IntelCpu } from "../intel";

const broadwell: IntelCpu[] = [
  {
    name: "Core i7-5775C",
    socket: "LGA 1150",
    codeName: "Broadwell",
  },
  {
    name: "Core i5-5675C",
    socket: "LGA 1150",
    codeName: "Broadwell",
  },
];

const haswellE: IntelCpu[] = [
  {
    name: "Core i7-5960X",
    socket: "LGA 2011-3",
    codeName: "Haswell-E",
  },
  {
    name: "Core i7-5930K",
    socket: "LGA 2011-3",
    codeName: "Haswell-E",
  },
  {
    name: "Core i7-5820K",
    socket: "LGA 2011-3",
    codeName: "Haswell-E",
  },
];

export const coreI5thGen: IntelCpu[] = [...broadwell, ...haswellE];
