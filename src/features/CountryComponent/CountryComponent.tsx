import { memo, useEffect, useState } from "react";
import type { CO2Data, CountryData } from "../../utils/types.types";
import styles from "./CountryComponent.module.css";
import clsx from "clsx";

const CountryComponent = ({
  data,
  settings,
  lastAdded,
}: {
  data: CountryData;
  settings: Array<keyof CO2Data> | null;
  lastAdded: keyof CO2Data | null;
}) => {
  const yearData = data.yearData;

  const [highlighted, setHighlighted] = useState<keyof CO2Data | null>(null);

  useEffect(() => {
    if (lastAdded) {
      setHighlighted(lastAdded);
      const timer = setTimeout(() => setHighlighted(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastAdded]);

  return (
    <tr className={styles.row}>
      <td>{data.year}</td>
      <td>{data.name}</td>
      <td>{data.population ?? "NA"}</td>
      <td>{data.iso ?? "NA"}</td>
      {settings &&
        settings.map((item, index) => {
          return (
            <td
              key={index}
              className={clsx(item === highlighted && styles.highlight)}
            >
              {yearData?.[item] ?? "NA"}
            </td>
          );
        })}
    </tr>
  );
};

export const MemoizedCountryComponent = memo(CountryComponent);
