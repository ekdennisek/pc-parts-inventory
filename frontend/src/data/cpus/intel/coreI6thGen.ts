import type { IntelCpu } from "../intel";

const skylake: IntelCpu[] = [
  {
    name: "Core i7-6700K",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i7-6700",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i7-6700T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6600K",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6600",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6600T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6500",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6500T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6402P",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6400",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i5-6400T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6320",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6300",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6300T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6100",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6100T",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
  {
    name: "Core i3-6098P",
    socket: "LGA 1151-1",
    codeName: "Skylake",
  },
];

const broadwellE: IntelCpu[] = [
  {
    name: "Core i7-6950X",
    socket: "LGA 2011-3",
    codeName: "Broadwell-E",
  },
  {
    name: "Core i7-6900K",
    socket: "LGA 2011-3",
    codeName: "Broadwell-E",
  },
  {
    name: "Core i7-6850K",
    socket: "LGA 2011-3",
    codeName: "Broadwell-E",
  },
  {
    name: "Core i7-6800K",
    socket: "LGA 2011-3",
    codeName: "Broadwell-E",
  },
];

export const coreI6thGen: IntelCpu[] = [...skylake, ...broadwellE];
