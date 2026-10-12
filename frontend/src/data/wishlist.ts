import type {
    WishlistCPU,
    WishlistMotherboard,
    WishlistPowerSupply,
    WishlistGraphicsCard,
    WishlistRAM,
    WishlistCase,
    WishlistStorage,
    WishlistPeripheral,
} from "../types";

export const cpuWishlist: WishlistCPU[] = [];

export const motherboardWishlist: WishlistMotherboard[] = [
    {
        socket: "LGA 1366",
        chipset: "Intel X58",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 1156",
        chipset: "Intel P55",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 1155",
        chipset: "Intel X68",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 2011",
        chipset: "Intel X79",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 2011",
        chipset: "Intel X99",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 1150",
        chipset: "Intel Z87",
        ioShield: true,
        box: true,
    },
    {
        socket: "LGA 1150",
        chipset: "Intel Z97",
        ioShield: true,
        box: true,
    },
];

export const powerSupplyWishlist: WishlistPowerSupply[] = [];

export const graphicsCardWishlist: WishlistGraphicsCard[] = [];

export const ramWishlist: WishlistRAM[] = [];

export const caseWishlist: WishlistCase[] = [];

export const storageWishlist: WishlistStorage[] = [];

export const peripheralWishlist: WishlistPeripheral[] = [];

export const allWishlists = {
    cpu: cpuWishlist,
    motherboard: motherboardWishlist,
    powerSupply: powerSupplyWishlist,
    graphicsCard: graphicsCardWishlist,
    ram: ramWishlist,
    case: caseWishlist,
    storage: storageWishlist,
    peripheral: peripheralWishlist,
};
