import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Modal } from "../components/Modal/Modal";
import cslx from "clsx";
import { CountryComponent } from "../features/CountryComponent/CountryCompoennt";
import type { TSettings } from "../utils/types.types";
import { Settings } from "../components/Settings/Settings";

const countries = [
  {
    name: "United States",
    region: "Americas",
    population: 331000000,
    iso: "iso",
  },
  { name: "China", region: "Asia", population: 1412000000, iso: "iso" },
  { name: "India", region: "Asia", population: 1380000000, iso: "iso" },
  { name: "Russia", region: "Europe", population: 146000000, iso: "iso" },
  { name: "Germany", region: "Europe", population: 83000000, iso: null },
];

const regions: string[] = ["All", "Europe", "Asia", "Americas", "Africa"];
const availableFields: string[] = [
  "year",
  "population",
  "co2",
  "co2_per_capita",
];

export const App = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [regionFilter, setRegionFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [settings, setSettings] = useState([
    "year",
    "population",
    "co2",
    "co2_per_capita",
  ]);

  useEffect(() => {
    console.log("shall fetch data here");
  }, []);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
            placeholder="Enter country name..."
          />
        </label>
        <label>
          Year:
          <input
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className={styles.select}
            type="number"
            min={1600}
            max={2026}
          ></input>
        </label>
        <label>
          Region:
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className={styles.select}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.select}
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="population-asc">Population (↑)</option>
            <option value="population-desc">Population (↓)</option>
          </select>
        </label>
      </section>

      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Select Columns
      </button>
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <Settings
          availableFields={availableFields}
          selectedFields={settings}
          onChange={setSettings}
        />
      </Modal>
      <main className={styles.main}>
        <table className={cslx(styles.table, styles["all-data"])}>
          <thead className={styles.headers}>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Population (latest)</th>
              <th>ISO</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, index) => {
              return (
                <CountryComponent key={index} data={c} settings={settings} />
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};
