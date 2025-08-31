import styles from "./App.module.css";

import { Suspense } from "react";

import { LazyTableView } from "../features/TableView/LazyTableView";
import { Loader } from "../components/Loader/Loader";
import { FormHandlers } from "../features/FormHandlers/FormHandler";
import { SettingsModal } from "../features/SettingsModal/SettingsModal";

export const App = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CO₂ Dashboard</h1>
      </header>

      <FormHandlers />
      <SettingsModal />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <LazyTableView />
        </Suspense>
      </main>
    </div>
  );
};
