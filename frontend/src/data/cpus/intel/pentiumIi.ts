import type { IntelCpu } from "../intel";

const klamath: IntelCpu[] = [
  {
    name: "Pentium II 233",
    socket: "Slot 1",
    codeName: "Klamath",
  },
  {
    name: "Pentium II 266",
    socket: "Slot 1",
    codeName: "Klamath",
  },
  {
    name: "Pentium II 300",
    socket: "Slot 1",
    codeName: "Klamath",
  },
];

const deschutes: IntelCpu[] = [
  {
    name: "Pentium II 266",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II 300",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II 333",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II Overdrive",
    socket: "Socket 8",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II 350",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II 400",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
  {
    name: "Pentium II 450",
    socket: "Slot 1",
    codeName: "Deschutes",
  },
];

export const pentiumIi: IntelCpu[] = [
  ...klamath,
  ...deschutes,
];
