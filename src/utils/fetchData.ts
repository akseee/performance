import type { CO2 } from "./types.types";

let dataPromise: Promise<CO2> | null = null;
let data: CO2 | null = null;
let error: unknown = null;

function fetchCO2(): Promise<CO2> {
  return fetch(
    "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((json: CO2) => {
      data = json;
      return json;
    })
    .catch((err) => {
      error = err;
      throw err;
    });
}

export function getCO2Resource() {
  if (data) return data;
  if (error) throw error;
  if (!dataPromise) {
    dataPromise = fetchCO2();
  }
  throw dataPromise;
}
