import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.container}>
    <div>Загрузка данных CO₂… (может занять время для большого файла)</div>
  </div>
);
