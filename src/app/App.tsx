import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import styles from "./App.module.css";

import cslx from "clsx";
import type { CO2, CO2Data } from "../utils/types.types";
import { MemoizedCountryComponent } from "../features/CountryComponent/CountryComponent";
import {
  filterQuery,
  filterYear,
  sortCountries,
} from "../utils/tableFunctions";
import { Modal } from "../components/Modal/Modal";
import { Settings } from "../components/Settings/Settings";

export const App = () => {
  const [year, setYear] = useState<null | number>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [selectedSettings, setSelectedSettings] = useState<
    Array<keyof CO2Data>
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataRaw, setDataRaw] = useState<CO2 | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  }, []);

  const handleSettingsChange = useCallback((fields: Array<keyof CO2Data>) => {
    setSelectedSettings(fields);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    fetch(
      "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json",
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: CO2) => {
        setDataRaw(data);
      })
      .catch((err) => {
        if ((err as Error).name === "AbortError") {
          return;
        }
        setError(String(err));
      });

    return () => {
      controller.abort();
    };
  }, []);

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

  const filteredByQuery = useMemo(() => {
    return filterQuery(countries, query);
  }, [countries, query]);

  const filteredByYear = useMemo(() => {
    return year !== null ? filterYear(filteredByQuery, year) : filteredByQuery;
  }, [filteredByQuery, year]);

  const sortedCountries = useMemo(() => {
    return sortCountries(filteredByYear, sort);
  }, [filteredByYear, sort]);

  const settings = useMemo(() => {
    return [...selectedSettings];
  }, [selectedSettings]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CO₂ Dashboard</h1>
      </header>

      <section className={styles.controls}>
        <label>
          Search:
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            className={styles.input}
            placeholder="Enter country name..."
          />
        </label>
        <label>
          Year:
          <input
            value={year ?? ""}
            onChange={handleYearChange}
            className={styles.select}
            type="number"
            min={1600}
            max={2023}
          ></input>
        </label>
        <label>
          Sort by:
          <select
            value={sort}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="population-asc">Population (↑)</option>
            <option value="population-desc">Population (↓)</option>
          </select>
        </label>
      </section>

      <button className={styles.button} onClick={handleOpenModal}>
        Select Columns
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
          <Settings selectedFields={settings} onChange={handleSettingsChange} />
        </Modal>
      )}
      <main className={styles.main}>
        {error && <div> An error has occured: {error}</div>}
        <table className={cslx(styles.table, styles["all-data"])}>
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
                />
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};
