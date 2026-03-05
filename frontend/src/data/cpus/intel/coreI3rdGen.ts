import type { IntelCpu } from "../intel";

const ivyBridge: IntelCpu[] = [
  {
    name: "Core i7-3770K",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i7-3770",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i7-3770S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i7-3770T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3570K",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3570",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3570S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3570T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3550",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3550S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3470",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3475S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3470S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3470T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3450",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3450S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3350P",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3340",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3340S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3330",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3335S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i5-3330S",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3250",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3250T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3245",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3240",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3240T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3225",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3220",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3220T",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
  {
    name: "Core i3-3210",
    socket: "LGA 1155",
    codeName: "Ivy Bridge",
  },
];

const sandyBridgeE: IntelCpu[] = [
  {
    name: "Core i7-3970X",
    socket: "LGA 2011",
    codeName: "Sandy Bridge-E",
  },
  {
    name: "Core i7-3960X",
    socket: "LGA 2011",
    codeName: "Sandy Bridge-E",
  },
  {
    name: "Core i7-3930K",
    socket: "LGA 2011",
    codeName: "Sandy Bridge-E",
  },
  {
    name: "Core i7-3820",
    socket: "LGA 2011",
    codeName: "Sandy Bridge-E",
  },
];

export const coreI3rdGen: IntelCpu[] = [...ivyBridge, ...sandyBridgeE];
