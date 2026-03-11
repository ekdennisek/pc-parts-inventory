type Socket = {
  name: string;
  releaseYear?: number;
  sorting: number;
};

const intelSocketsArray = [
  { name: "PGA68", releaseYear: 1982, sorting: 0 },
  { name: "PGA132", releaseYear: 1985, sorting: 1 },
  { name: "PGA168", releaseYear: 1989, sorting: 2 },
  { name: "Socket 1", releaseYear: 1989, sorting: 3 },
  { name: "Socket 2", releaseYear: 1990, sorting: 4 },
  { name: "Socket 3", releaseYear: 1991, sorting: 5 },
  { name: "Socket 4", releaseYear: 1993, sorting: 6 },
  { name: "Socket 5", releaseYear: 1995, sorting: 7 },
  { name: "Socket 6", sorting: 8 },
  { name: "Socket 7", releaseYear: 1995, sorting: 9 },
  { name: "Socket 8", releaseYear: 1995, sorting: 10 },
  { name: "Slot 1", releaseYear: 1997, sorting: 11 },
  { name: "Socket 370", releaseYear: 1999, sorting: 12 },
  { name: "Socket 423", releaseYear: 2000, sorting: 13 },
  { name: "Socket 478", releaseYear: 2001, sorting: 14 },
  { name: "LGA 775", releaseYear: 2004, sorting: 15 },
  { name: "LGA 1366", releaseYear: 2008, sorting: 16 },
  { name: "LGA 1156", releaseYear: 2009, sorting: 17 },
  { name: "LGA 1155", releaseYear: 2011, sorting: 18 },
  { name: "LGA 2011", releaseYear: 2011, sorting: 19 },
  { name: "LGA 1150", releaseYear: 2013, sorting: 20 },
  { name: "LGA 2011-3", releaseYear: 2014, sorting: 21 },
  { name: "LGA 1151-1", releaseYear: 2015, sorting: 22 },
  { name: "LGA 1151-2", releaseYear: 2017, sorting: 23 },
  { name: "LGA 2066", releaseYear: 2017, sorting: 24 },
  { name: "LGA 1200", releaseYear: 2020, sorting: 25 },
  { name: "LGA 1700", releaseYear: 2021, sorting: 26 },
  { name: "LGA 1851", releaseYear: 2024, sorting: 27 },
] as const satisfies Socket[];

export const intelSockets = new Map<string, Socket>(
  intelSocketsArray.map((socket) => [socket.name, socket]),
);

const amdSocketsArray = [
  { name: "PGA168", releaseYear: 1989, sorting: 0 },
  { name: "Socket 1", releaseYear: 1989, sorting: 1 },
  { name: "Socket 2", releaseYear: 1990, sorting: 2 },
  { name: "Socket 3", releaseYear: 1991, sorting: 3 },
  { name: "Socket 5", releaseYear: 1995, sorting: 4 },
  { name: "Socket 7", releaseYear: 1995, sorting: 5 },
  { name: "Super Socket 7", releaseYear: 1998, sorting: 6 },
  { name: "Slot A", releaseYear: 1999, sorting: 7 },
  { name: "Socket A", releaseYear: 2000, sorting: 8 },
  { name: "Socket 754", releaseYear: 2003, sorting: 9 },
  { name: "Socket 940", releaseYear: 2003, sorting: 10 },
  { name: "Socket 939", releaseYear: 2004, sorting: 11 },
  { name: "Socket AM2", releaseYear: 2006, sorting: 12 },
  { name: "Socket F", releaseYear: 2006, sorting: 13 },
  { name: "Socket AM2+", releaseYear: 2007, sorting: 14 },
  { name: "Socket AM3", releaseYear: 2009, sorting: 15 },
  { name: "Socket FM1", releaseYear: 2011, sorting: 16 },
  { name: "Socket AM3+", releaseYear: 2011, sorting: 17 },
  { name: "Socket FM2", releaseYear: 2012, sorting: 18 },
  { name: "Socket FM2+", releaseYear: 2014, sorting: 19 },
  { name: "Socket AM1", releaseYear: 2014, sorting: 20 },
  { name: "Socket AM4", releaseYear: 2016, sorting: 21 },
  { name: "Socket AM5", releaseYear: 2022, sorting: 22 },
] as const satisfies Socket[];

export const amdSockets = new Map<string, Socket>(
  amdSocketsArray.map((socket) => [socket.name, socket]),
);

type SocketNames<T extends readonly Socket[]> = T[number]["name"];

export type IntelSocket = SocketNames<typeof intelSocketsArray>;

export type AmdSocket = SocketNames<typeof amdSocketsArray>;

export type CpuSocket = IntelSocket | AmdSocket;
