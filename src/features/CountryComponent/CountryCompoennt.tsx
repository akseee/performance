import { useState } from "react";
import styles from "./CountryCompoenent.module.css";
import type { TSettings } from "../../utils/types.types";

export const CountryComponent = ({
  data,
  settings,
}: {
  data: {
    name: string;
    region: string;
    population: number | null;
    iso: string | null;
    [key: string]: string | number | null | undefined;
  };
  settings: TSettings;
}) => {
  const [detailed, setIsDetailed] = useState(false);
  return (
    <>
      <tr>
        <td className={styles.controls}>
          <button
            className={styles.button}
            onClick={() => setIsDetailed(!detailed)}
          >
            {detailed ? <span>&#9650;</span> : <span>&#9660;</span>}
          </button>
        </td>
        <td className={styles.name}>{data.name}</td>
        <td className={styles.population}>{data.population}</td>
        <td className={styles.iso}>{data.iso || "NA"}</td>
      </tr>
      {detailed && (
        <tr>
          <td colSpan={4}>
            <table className={styles["inside-data"]}>
              <thead>
                <tr>
                  {Object.entries(settings).map(([key, isVisible]) =>
                    isVisible ? <th key={key}>{key}</th> : null
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* data.details.map((yearData, index) => (
                    <tr key={index}>
                      {Object.entries(settings).map(([key, isVisible]) =>
                        isVisible ? <td key={key}>{yearData[key] ?? "NA"}</td> : null
                      )}
                    </tr>
                  ))} */}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};
