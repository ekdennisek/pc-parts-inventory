import type { Case } from "../types";

export const cases: Case[] = [
  {
    id: "case-1",
    name: "Hyrican CyberGamer 4890",
    brand: "Hyrican",
    description:
      "mATX case, probably from 2015 (see https://web.archive.org/web/20150917052923/http://www.hyrican.de/index.php/produkte/gaming/cyber-gamer/)",
    supportedFormFactors: ["Micro ATX"], // TODO mini ITX?
    external525Drives: 2,
    external35Drives: 1,
    glassPanel: false,
    releaseYear: 2015,
  },
  {
    id: "case-2",
    name: "Hansan Systems Power III (Audi)",
    brand: "Hansan Systems",
    description:
      "ATX case, https://web.archive.org/web/20010124100100/http://www.hansansystems.com/PowerIII.htm",
    supportedFormFactors: ["ATX"], // TODO micro atx, mini itx?
    external525Drives: 3,
    external35Drives: 2,
    glassPanel: false,
    releaseYear: 2001,
  },
  {
    id: "case-3",
    name: "Lian Li PC-7B Plus II",
    brand: "Lian Li",
    description: "ATX case with aluminum body",
    supportedFormFactors: ["ATX", "Micro ATX"], // TODO mini ITX?
    external525Drives: 4,
    external35Drives: 2,
    glassPanel: false,
    releaseYear: 2006,
  },
];
