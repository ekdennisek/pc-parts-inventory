type Series = {
    name: string;
    releaseYear?: number;
    sorting: number;
};

const nvidiaSeriesArray = [
    { name: "RIVA 128", releaseYear: 1997, sorting: 0 },
    { name: "RIVA TNT", releaseYear: 1998, sorting: 1 },
    { name: "RIVA TNT2", releaseYear: 1999, sorting: 2 },
    { name: "GeForce 256", releaseYear: 1999, sorting: 3 },
    { name: "GeForce 2", releaseYear: 2000, sorting: 4 },
    { name: "GeForce 3", releaseYear: 2001, sorting: 5 },
    { name: "GeForce 4", releaseYear: 2002, sorting: 6 },
    { name: "GeForce FX", releaseYear: 2003, sorting: 7 },
    { name: "GeForce 6", releaseYear: 2004, sorting: 8 },
    { name: "GeForce 7", releaseYear: 2005, sorting: 9 },
    { name: "GeForce 8", releaseYear: 2006, sorting: 10 },
    { name: "GeForce 9", releaseYear: 2008, sorting: 11 },
    { name: "GeForce 200", releaseYear: 2008, sorting: 12 },
    { name: "GeForce 100", releaseYear: 2009, sorting: 13 },
    { name: "GeForce 300", releaseYear: 2009, sorting: 14 },
    { name: "GeForce 400", releaseYear: 2010, sorting: 15 },
    { name: "GeForce 500", releaseYear: 2010, sorting: 16 },
    { name: "GeForce 600", releaseYear: 2012, sorting: 17 },
    { name: "GeForce 700", releaseYear: 2013, sorting: 18 },
    { name: "GeForce 900", releaseYear: 2014, sorting: 19 },
    { name: "GeForce 10", releaseYear: 2016, sorting: 20 },
    { name: "GeForce 20", releaseYear: 2018, sorting: 21 },
    { name: "GeForce 16", releaseYear: 2019, sorting: 22 },
    { name: "GeForce 30", releaseYear: 2020, sorting: 23 },
    { name: "GeForce 40", releaseYear: 2022, sorting: 24 },
    { name: "GeForce 50", releaseYear: 2025, sorting: 25 },
] as const satisfies Series[];

export const nvidiaGpuSeries = new Map<string, Series>(
    nvidiaSeriesArray.map((series) => [series.name, series]),
);

// Up to the HD 5000 series, which were the last cards sold under the ATI brand
const atiSeriesArray = [
    { name: "Rage", releaseYear: 1995, sorting: 0 },
    { name: "Rage 128", releaseYear: 1998, sorting: 1 },
    { name: "Radeon 7000", releaseYear: 2000, sorting: 2 },
    { name: "Radeon 8000", releaseYear: 2001, sorting: 3 },
    // By name, so the R200 based 9000 to 9250 belong here as well as the R300 based 9500 to 9800
    { name: "Radeon 9000", releaseYear: 2002, sorting: 4 },
    { name: "Radeon X800", releaseYear: 2004, sorting: 5 },
    { name: "Radeon X300-X600", releaseYear: 2004, sorting: 6 },
    { name: "Radeon X700", releaseYear: 2004, sorting: 7 },
    { name: "Radeon X1000", releaseYear: 2005, sorting: 8 },
    { name: "Radeon HD 2000", releaseYear: 2007, sorting: 9 },
    { name: "Radeon HD 3000", releaseYear: 2007, sorting: 10 },
    { name: "Radeon HD 4000", releaseYear: 2008, sorting: 11 },
    { name: "Radeon HD 5000", releaseYear: 2009, sorting: 12 },
] as const satisfies Series[];

export const atiGpuSeries = new Map<string, Series>(
    atiSeriesArray.map((series) => [series.name, series]),
);

const amdSeriesArray = [
    { name: "Radeon HD 6000", releaseYear: 2010, sorting: 0 },
    { name: "Radeon HD 7000", releaseYear: 2012, sorting: 1 },
    { name: "Radeon HD 8000", releaseYear: 2013, sorting: 2 },
    { name: "Radeon 200", releaseYear: 2013, sorting: 3 },
    { name: "Radeon 300", releaseYear: 2015, sorting: 4 },
    { name: "Radeon 400", releaseYear: 2016, sorting: 5 },
    { name: "Radeon 500", releaseYear: 2017, sorting: 6 },
    { name: "Radeon RX Vega", releaseYear: 2017, sorting: 7 },
    { name: "Radeon RX 5000", releaseYear: 2019, sorting: 8 },
    { name: "Radeon RX 6000", releaseYear: 2020, sorting: 9 },
    { name: "Radeon RX 7000", releaseYear: 2022, sorting: 10 },
    { name: "Radeon RX 9000", releaseYear: 2025, sorting: 11 },
] as const satisfies Series[];

export const amdGpuSeries = new Map<string, Series>(
    amdSeriesArray.map((series) => [series.name, series]),
);

const matroxSeriesArray = [
    { name: "Millennium", sorting: 0 },
    // Includes the die-shrunk Mystique 220
    { name: "Mystique", releaseYear: 1996, sorting: 1 },
    { name: "Millennium II", sorting: 2 },
    { name: "G100", releaseYear: 1998, sorting: 3 },
    { name: "G200", releaseYear: 1998, sorting: 4 },
    { name: "G400", releaseYear: 1999, sorting: 5 },
    { name: "G450", releaseYear: 2000, sorting: 6 },
    { name: "G550", releaseYear: 2001, sorting: 7 },
    { name: "Parhelia", releaseYear: 2002, sorting: 8 },
] as const satisfies Series[];

export const matroxGpuSeries = new Map<string, Series>(
    matroxSeriesArray.map((series) => [series.name, series]),
);

type SeriesNames<T extends readonly Series[]> = T[number]["name"];

export type NvidiaGpuSeries = SeriesNames<typeof nvidiaSeriesArray>;

export type AtiGpuSeries = SeriesNames<typeof atiSeriesArray>;

export type AmdGpuSeries = SeriesNames<typeof amdSeriesArray>;

export type MatroxGpuSeries = SeriesNames<typeof matroxSeriesArray>;

export type GpuSeries = NvidiaGpuSeries | AtiGpuSeries | AmdGpuSeries | MatroxGpuSeries;
