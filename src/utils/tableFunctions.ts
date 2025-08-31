import type { CO2Data, CountryData } from "./types.types";

export function filterQuery(array: CountryData[], query: string) {
  if (!query.trim()) return array;
  const lower = query.toLowerCase();

  return array.filter((c) => c.name.toLowerCase().includes(lower));
}

export function filterYear(array: CountryData[], year: number) {
  return array.map((country) => {
    const yearData = country.data.find((d) => d.year === year);
    return {
      ...country,
      population: yearData?.population ?? null,
      year: yearData?.year ?? null,
      yearData: yearData,
    };
  });
}

export function sortCountries(array: CountryData[], type: string) {
  const arr = [...array];
  switch (type) {
    case "name-asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "population-asc":
      return arr.sort((a, b) => (a.population ?? 0) - (b.population ?? 0));
    case "population-desc":
      return arr.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
    default:
      return arr;
  }
}

export function extractSettings(array: CO2Data[]) {
  const sample: CO2Data | undefined = array[0];

  if (!sample) return {} as Record<keyof CO2Data, boolean>;

  const settings = Object.keys(sample).reduce(
    (acc, key) => {
      acc[key as keyof CO2Data] = false;
      return acc;
    },
    {} as Record<keyof CO2Data, boolean>
  );

  return settings;
}
