import { memo } from "react";
import type { CO2Data, CountryData } from "../../utils/types.types";
import styles from "./CountryComponent.module.css";

const CountryComponent = ({
  data,
  settings,
}: {
  data: CountryData;
  settings: Array<keyof CO2Data>;
}) => {
  const yearData = data.data.find((d) => d.year === data.year);

  return (
    <tr className={styles.row}>
      <td>{data.year}</td>
      <td>{data.name}</td>
      <td>{data.population ?? "NA"}</td>
      <td>{data.iso ?? "NA"}</td>
      {settings.map((item, index) => {
        return <td key={index}>{yearData?.[item] ?? "NA"}</td>;
      })}
    </tr>
  );
};

export const MemoizedCountryComponent = memo(CountryComponent);
