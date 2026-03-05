import type { IntelCpu } from "../intel";

const coffeeLakeR: IntelCpu[] = [
  {
    name: "Core i9-9900KS",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i9-9900K",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i9-9900KF",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i9-9900",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i9-9900T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i7-9700K",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i7-9700KF",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i7-9700",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i7-9700F",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i7-9700T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9600K",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9600KF",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9600",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9600T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9500",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9500F",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9500T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9400",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9400F",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i5-9400T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9350K",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9350KF",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9320",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9300",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9300T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9100",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9100F",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
  {
    name: "Core i3-9100T",
    socket: "LGA 1151-2",
    codeName: "Coffee Lake Refresh",
  },
];

const skylakeX: IntelCpu[] = [
  {
    name: "Core i9-9990XE",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9980XE",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9960X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9940X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9920X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9900X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i9-9820X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
  {
    name: "Core i7-9800X",
    socket: "LGA 2066",
    codeName: "Skylake-X",
  },
];

export const coreI9thGen: IntelCpu[] = [...coffeeLakeR, ...skylakeX];
