import type { IntelSocket } from "../../types";
import { core2 } from "./intel/core2";
import { coreI1stGen } from "./intel/coreI1stGen";
import { coreI2ndGen } from "./intel/coreI2ndGen";
import { coreI3rdGen } from "./intel/coreI3rdGen";
import { coreI4thGen } from "./intel/coreI4thGen";
import { coreI5thGen } from "./intel/coreI5thGen";
import { coreI6thGen } from "./intel/coreI6thGen";
import { coreI7thGen } from "./intel/coreI7thGen";
import { coreI8thGen } from "./intel/coreI8thGen";
import { coreI9thGen } from "./intel/coreI9thGen";

export type IntelCpu = {
  name: string;
  socket: IntelSocket;
  codeName: string;
  sSpec?: string;
  stepping?: string;
  partNumbers?: string[];
  note?: string;
};

export const intelCpus: IntelCpu[] = [
  ...core2,
  ...coreI1stGen,
  ...coreI2ndGen,
  ...coreI3rdGen,
  ...coreI4thGen,
  ...coreI5thGen,
  ...coreI6thGen,
  ...coreI7thGen,
  ...coreI8thGen,
  ...coreI9thGen,
];
