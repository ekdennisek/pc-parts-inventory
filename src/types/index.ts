export interface PCPart {
  id: string;
  name: string;
  brand: string;
  description: string;
  releaseYear?: number;
}

export interface CPU extends PCPart {
  cores: number;
  threads: number;
  baseClock: number; // GHz
  boostClock?: number; // GHz
  socket: string;
  tdp: number; // Watts
}

export interface Motherboard extends PCPart {
  socket: string;
  formFactor: string;
  chipset: string;
  memorySlots: number;
  maxMemory: number; // GB
  pciSlots: number;
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
  interface: string; // PCIe 4.0, etc.
}

export type PartType = "cpu" | "motherboard" | "powerSupply" | "graphicsCard";

export const PART_TYPES: Record<PartType, string> = {
  cpu: "CPUs",
  motherboard: "Motherboards",
  powerSupply: "Power Supplies",
  graphicsCard: "Graphics Cards",
};
