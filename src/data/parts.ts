import type { CPU, Motherboard, PowerSupply, GraphicsCard } from "../types";

export const cpus: CPU[] = [
  {
    id: "cpu-1",
    name: "Intel Core 2 Duo E6600",
    brand: "Intel",
    description: "Dual core processor",
    cores: 2,
    threads: 2,
    baseClock: 2.4,
    socket: "LGA775",
    tdp: 65,
    releaseYear: "2006",
  },
  {
    id: "cpu-2",
    name: "AMD A8-5500",
    brand: "AMD",
    description: "Quad core processor",
    cores: 4,
    threads: 4,
    baseClock: 3.2,
    boostClock: 3.7,
    socket: "FM2",
    tdp: 65,
    releaseYear: "2012",
  },
  {
    id: "cpu-3",
    name: "AMD Athlon X2 4450e",
    brand: "AMD",
    description: "Dual core processor",
    cores: 2,
    threads: 2,
    baseClock: 2.3,
    socket: "AM2",
    tdp: 45,
    releaseYear: "2008",
  },
  {
    id: "cpu-4",
    name: "AMD Phenom X3 8650",
    brand: "AMD",
    description: "Triple core processor",
    cores: 3,
    threads: 3,
    baseClock: 2.3,
    socket: "AM2+",
    tdp: 95,
    releaseYear: "2008",
  },
  {
    id: "cpu-5",
    name: "AMD Athlon II X4 645",
    brand: "AMD",
    description: "Quad core processor",
    cores: 4,
    threads: 4,
    baseClock: 3.1,
    socket: "AM3",
    tdp: 95,
    releaseYear: "2010",
  },
];

export const motherboards: Motherboard[] = [
  {
    id: "mb-1",
    name: "ASRock FM2A78M-ITX+",
    brand: "ASRock",
    description: "Mini ITX motherboard",
    socket: "FM2",
    formFactor: "Mini ITX",
    chipset: "A78",
    memorySlots: 2,
    maxMemory: 32,
    pciSlots: 1,
  },
];

export const powerSupplies: PowerSupply[] = [
  {
    id: "psu-1",
    name: "EVGA 500B",
    brand: "EVGA",
    description: "500W 80+ Bronze",
    wattage: 500,
    efficiency: "80+ Bronze",
    modular: false,
    formFactor: "ATX",
  },
  {
    id: "psu-2",
    name: "Corsair SF750",
    brand: "Corsair",
    description: "80+ Platinum modular SFX power supply",
    wattage: 750,
    efficiency: "80+ Platinum",
    modular: true,
    formFactor: "SFX",
  },
];

export const graphicsCards: GraphicsCard[] = [
  {
    id: "gpu-1",
    name: "ASUS GeForce GTX 1060 3GB DUAL OC",
    brand: "NVIDIA",
    description: "GeForce GTX 1060 3GB",
    memory: 3,
    memoryType: "GDDR5",
    coreClock: 1594,
    boostClock: 1809,
    powerConsumption: 120,
    interface: "PCIe 3.0",
  },
];

export const allParts = {
  cpu: cpus,
  motherboard: motherboards,
  powerSupply: powerSupplies,
  graphicsCard: graphicsCards,
};
