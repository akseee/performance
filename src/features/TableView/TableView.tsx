import { useMemo } from "react";
import type { CO2Data } from "../../utils/types.types";
import { MemoizedCountryComponent } from "../CountryComponent/CountryComponent";
import styles from "./TableView.module.css";
import {
  filterQuery,
  filterYear,
  sortCountries,
} from "../../utils/tableFunctions";
import { getCO2Resource } from "../../utils/fetchData";
import {
  getAllSettings,
  getLastAddedSettings,
  getQuery,
  getSort,
  getYear,
} from "../../app/store/applicationSlice";
import { useSelector } from "../../app/store/store";

const TableView = () => {
  const settings = useSelector(getAllSettings);
  const lastAdded = useSelector(getLastAddedSettings);

  const dataRaw = getCO2Resource();

  const countries = useMemo(() => {
    if (dataRaw === null) return [];
    return Object.entries(dataRaw).map(([name, payload]) => {
      const arr: CO2Data[] = Array.isArray(payload.data) ? payload.data : [];
      const latest =
        arr.length > 0
          ? arr.reduce((acc, cur) => (acc.year > cur.year ? acc : cur), arr[0])
          : undefined;

      return {
        name,
        iso:
          typeof payload.iso_code === "string" && payload.iso_code
            ? payload.iso_code
            : null,
        population: latest
          ? typeof latest.population === "number"
            ? latest.population
            : null
          : null,
        data: arr,
        year: latest?.year,
      };
    });
  }, [dataRaw]);

  const year = useSelector(getYear);
  const query = useSelector(getQuery);
  const sort = useSelector(getSort);

  const filteredByQuery = useMemo(() => {
    return filterQuery(countries, query);
  }, [countries, query]);

  const filteredByYear = useMemo(() => {
    return year !== null ? filterYear(filteredByQuery, year) : filteredByQuery;
  }, [filteredByQuery, year]);

  const sortedCountries = useMemo(() => {
    return sortCountries(filteredByYear, sort);
  }, [filteredByYear, sort]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.headers}>
          <tr>
            <th>year</th>
            <th>name</th>
            <th>population (latest)</th>
            <th>ISO</th>
            {settings.map((item: string, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((c) => {
            return (
              <MemoizedCountryComponent
                key={c.name}
                data={c}
                settings={settings}
                lastAdded={lastAdded}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
