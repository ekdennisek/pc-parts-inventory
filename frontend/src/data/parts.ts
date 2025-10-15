import { cpus } from "./cpus";
import { graphicsCards } from "./gpus";
import { motherboards } from "./motherboards";
import { powerSupplies } from "./powerSupplies";
import { ram } from "./ram";

export const allParts = {
  cpu: cpus,
  motherboard: motherboards,
  powerSupply: powerSupplies,
  graphicsCard: graphicsCards,
  ram: ram,
};
