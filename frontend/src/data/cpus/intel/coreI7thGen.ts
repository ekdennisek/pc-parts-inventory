import type { IntelCpu } from "../intel";

const kabyLake: IntelCpu[] = [
  {
    name: "Core i7-7700K",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i7-7700",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i7-7700T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7600K",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7600",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7600T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7500",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7500T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7400",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i5-7400T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7350K",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7320",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7300",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7300T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7100",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
  {
    name: "Core i3-7100T",
    socket: "LGA 1151-1",
    codeName: "Kaby Lake",
  },
];

const skylakeX: IntelCpu[] = [
  {
    name: "Core i9-7980XE",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-7960X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-7940X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-7920X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-7900X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i7-7820X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i7-7800X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
];

const kabyLakeX: IntelCpu[] = [
  {
    name: "Core i7-7740X",
    socket: "LGA 2066",
    codeName: "Kaby Lake-X",
  },
  {
    name: "Core i5-7640X",
    socket: "LGA 2066",
    codeName: "Kaby Lake-X",
  },
];

export const coreI7thGen: IntelCpu[] = [
  ...kabyLake,
  ...skylakeX,
  ...kabyLakeX,
];
