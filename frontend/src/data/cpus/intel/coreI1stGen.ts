import type { IntelCpu } from "../intel";

const lynnfield: IntelCpu[] = [
  {
    name: "Core i7-880",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i7-875K",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i7-870",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i7-870S",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i7-860",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i7-860S",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i5-760",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i5-750",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
  {
    name: "Core i5-750S",
    socket: "LGA 1156",
    codeName: "Lynnfield",
  },
];

const bloomfield: IntelCpu[] = [
  {
    name: "Core i7-975 Extreme Edition",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-965 Extreme Edition",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-960",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-950",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-940",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-930",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
  {
    name: "Core i7-920",
    socket: "LGA 1366",
    codeName: "Bloomfield",
  },
];

const clarkdale: IntelCpu[] = [
  {
    name: "Core i5-680",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i5-670",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i5-661",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i5-660",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i5-655K",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i5-650",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i3-560",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i3-550",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i3-540",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
  {
    name: "Core i3-530",
    socket: "LGA 1156",
    codeName: "Clarkdale",
  },
];

const gulftown: IntelCpu[] = [
  {
    name: "Core i7-990X",
    socket: "LGA 1366",
    codeName: "Gulftown",
  },
  {
    name: "Core i7-980X",
    socket: "LGA 1366",
    codeName: "Gulftown",
  },
  {
    name: "Core i7-980",
    socket: "LGA 1366",
    codeName: "Gulftown",
  },
  {
    name: "Core i7-970",
    socket: "LGA 1366",
    codeName: "Gulftown",
  },
];

export const coreI1stGen: IntelCpu[] = [
  ...lynnfield,
  ...bloomfield,
  ...clarkdale,
  ...gulftown,
];
