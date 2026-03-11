import { amdSockets, intelSockets, type CpuSocket } from "../data/sockets";

export const motherboardFormFactors = ["ATX", "Micro ATX", "Mini ITX"] as const;
export type MotherboardFormFactor = (typeof motherboardFormFactors)[number];

type MemoryType = "SDR" | "DDR" | "DDR2" | "DDR3" | "DDR4" | "DDR5";

type MemoryFormFactor = "DIMM" | "SO-DIMM";

export const gpuInterfaces = [
  "PCI",
  "AGP 3.3V",
  "AGP 1.5V",
  "AGP 0.8V",
  "PCIe 1.0",
  "PCIe 2.0",
  "PCIe 3.0",
  "PCIe 4.0",
] as const;

type GpuInterface = (typeof gpuInterfaces)[number];

export const storageFormFactors = ['3.5"', '2.5"', "M.2"] as const;
export type StorageFormFactor = (typeof storageFormFactors)[number];

export const storageInterfaces = [
  "IDE",
  "SATA II",
  "SATA III",
  "NVMe",
] as const;
export type StorageInterface = (typeof storageInterfaces)[number];

type StorageType = "SSD" | "HDD";

export interface PCPart {
  id: string;
  name: string;
  brand: string;
  description: string;
  releaseYear?: number;
  datasheet?: string;
  condition?: "working" | "defective";
}

export interface CPU extends PCPart {
  cores: number;
  threads: number;
  baseClock: number; // GHz
  boostClock?: number; // GHz
  socket: CpuSocket;
  tdp: number; // Watts
  codename?: string;
  partNumber?: string;
  sSpec?: string;
}

export interface Motherboard extends PCPart {
  socket: CpuSocket;
  formFactor: MotherboardFormFactor;
  chipset: string;
  memorySlots: number;
  memoryTypes: MemoryType[];
  maxMemory: number; // GB
  pcieSlots: number;
}

export interface PowerSupply extends PCPart {
  wattage: number;
  efficiency: string; // 80+ Bronze, Gold, etc.
  modular: boolean;
  formFactor: string;
}

export interface GraphicsCard extends PCPart {
  memory: number; // GB
  memoryType: string; // GDDR6, etc.
  coreClock: number; // MHz
  boostClock: number; // MHz
  powerConsumption: number; // Watts
  interface: GpuInterface; // PCIe 4.0, etc.
}

export interface RAM extends PCPart {
  capacity: number; // GB
  type: MemoryType; // DDR3, DDR4, DDR5, etc.
  speed: number; // MHz
  timings?: string; // CL16-18-18-38
  voltage?: number; // V
  formFactor: MemoryFormFactor; // DIMM, SO-DIMM
}

export interface Case extends PCPart {
  supportedFormFactors: MotherboardFormFactor[]; // Supported motherboard sizes
  external525Drives: number; // Number of 5.25" drive bays
  external35Drives: number; // Number of 3.5" drive bays
  glassPanel: boolean; // Whether it has a glass panel
}

export interface Storage extends PCPart {
  capacity: number; // GB
  type: StorageType; // SSD or HDD
  formFactor: StorageFormFactor;
  interface: StorageInterface;
  readSpeed?: number; // MB/s
  writeSpeed?: number; // MB/s
  rpm?: number; // RPM for HDDs
}

export type PartType =
  | "cpu"
  | "motherboard"
  | "powerSupply"
  | "graphicsCard"
  | "ram"
  | "case"
  | "storage";

export const PART_TYPES: Record<PartType, string> = {
  cpu: "CPUs",
  motherboard: "Motherboards",
  powerSupply: "Power Supplies",
  graphicsCard: "Graphics Cards",
  ram: "RAM",
  case: "Cases",
  storage: "Storage",
};

export interface PCBuild {
  id: string;
  name: string;
  case?: Case;
  motherboard?: Motherboard;
  cpu?: CPU;
  ram: RAM[];
  powerSupply?: PowerSupply;
  graphicsCard?: GraphicsCard;
}

export type BuildStep =
  | "case"
  | "motherboard"
  | "cpu"
  | "ram"
  | "powerSupply"
  | "graphicsCard"
  | "complete";

export interface SavedBuild {
  id: string;
  name: string;
  description?: string;
  caseId: string;
  motherboardId: string;
  cpuIds: string[];
  ramIds: string[];
  powerSupplyId: string;
  graphicsCardIds?: string[];
}

// Utility functions for socket detection
export const isIntelSocket = (socket: CpuSocket): boolean => {
  return intelSockets.has(socket);
};

export const isAmdSocket = (socket: CpuSocket): boolean => {
  return amdSockets.has(socket);
};

export const getSocketColor = (
  socket: CpuSocket,
): "intel" | "amd" | "unknown" => {
  if (isIntelSocket(socket)) return "intel";
  if (isAmdSocket(socket)) return "amd";
  return "unknown";
};
