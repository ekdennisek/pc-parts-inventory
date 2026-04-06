import { cpus } from "./cpus";
import { graphicsCards } from "./gpus";
import { motherboards } from "./motherboards";
import { powerSupplies } from "./powerSupplies";
import { ram } from "./ram";
import { cases } from "./cases";
import { storage } from "./storage";
import { peripherals } from "./peripherals";

export const allParts = {
  cpu: cpus,
  motherboard: motherboards,
  powerSupply: powerSupplies,
  graphicsCard: graphicsCards,
  ram: ram,
  case: cases,
  storage: storage,
  peripheral: peripherals,
};
