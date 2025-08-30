import styles from "./App.module.css";

import { Suspense, useCallback, useState, type ChangeEvent } from "react";

import { Modal } from "../components/Modal/Modal";
import { Settings } from "../components/Settings/Settings";
import { LazyTableView } from "../features/TableView/LazyTableView";
import { Loader } from "../components/Loader/Loader";

export const App = () => {
  const [year, setYear] = useState<null | number>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
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
            min={1800}
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
          <Settings />
        </Modal>
      )}
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <LazyTableView year={year} query={query} sort={sort} />
        </Suspense>
      </main>
    </div>
  );
};
