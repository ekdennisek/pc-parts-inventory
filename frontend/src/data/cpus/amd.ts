import type { AmdSocket } from "../../types";
import { athlon } from "./amd/athlon";
import { athlon64 } from "./amd/athlon64";
import { athlonIi } from "./amd/athlonIi";
import { athlonXp } from "./amd/athlonXp";
import { fx } from "./amd/fx";
import { igpu } from "./amd/igpu";
import { phenom } from "./amd/phenom";

export type AmdCpu = {
  name: string;
  socket: AmdSocket;
  codeName: string;
  stepping?: string;
  partNumber: string;
  note?: string;
};

export const amdCpus: AmdCpu[] = [
  ...athlon,
  ...athlon64,
  ...phenom,
  ...athlonIi,
  ...fx,
  ...igpu,
  ...athlonXp,
];
