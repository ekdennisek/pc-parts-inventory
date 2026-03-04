import type { IntelSocket } from "../../types";
import { core2 } from "./intel/core2";

export type IntelCpu = {
  name: string;
  socket: IntelSocket;
  codeName: string;
  sSpec: string;
  stepping?: string;
  partNumbers: string[];
  note?: string;
};

export const intelCpus: IntelCpu[] = [...core2];
