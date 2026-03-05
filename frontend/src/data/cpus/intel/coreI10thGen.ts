import type { IntelCpu } from "../intel";

const cometLake: IntelCpu[] = [
  {
    name: "Core i9-10900K",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10900KF",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10910",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10900",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10900F",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10900T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i9-10850K",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i7-10700K",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i7-10700KF",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i7-10700",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i7-10700F",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i7-10700T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10600K",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10600KF",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10600",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10600T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10500",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10500T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10400",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10400F",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10400T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10320",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10300",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10300T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10100",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10100F",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10100T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i5-10505",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10325",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10305",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10305T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10105",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10105F",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
  {
    name: "Core i3-10105T",
    socket: "LGA 1200",
    codeName: "Comet Lake",
  },
];

const cascadeLakeX: IntelCpu[] = [
  {
    name: "Core i9-10980XE",
    socket: "LGA 2066",
    codeName: "Cascade Lake-X",
  },
  {
    name: "Core i9-10940X",
    socket: "LGA 2066",
    codeName: "Cascade Lake-X",
  },
  {
    name: "Core i9-10920X",
    socket: "LGA 2066",
    codeName: "Cascade Lake-X",
  },
  {
    name: "Core i9-10900X",
    socket: "LGA 2066",
    codeName: "Cascade Lake-X",
  },
];

export const coreI10thGen: IntelCpu[] = [...cometLake, ...cascadeLakeX];
