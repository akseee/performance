import type { CO2Data } from "../../utils/types.types";
import styles from "./CountryComponent.module.css";

export type CountryData = {
  population: number | null;
  year: number | null;
  name: string;
  iso: string | null;
  data: CO2Data[];
};

export const CountryComponent = ({ data }: { data: CountryData }) => {
  return (
    <tr className={styles.row}>
      <td>{data.year}</td>
      <td>{data.name}</td>
      <td>{data.population ?? "NA"}</td>
      <td>{data.iso ?? "NA"}</td>
    </tr>
  );
};
