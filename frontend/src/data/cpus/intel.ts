import type { IntelSocket } from "../../types";
import { core2 } from "./intel/core2";
import { coreI1stGen } from "./intel/coreI1stGen";
import { coreI2ndGen } from "./intel/coreI2ndGen";

export type IntelCpu = {
  name: string;
  socket: IntelSocket;
  codeName: string;
  sSpec?: string;
  stepping?: string;
  partNumbers?: string[];
  note?: string;
};

export const intelCpus: IntelCpu[] = [...core2, ...coreI1stGen, ...coreI2ndGen];
