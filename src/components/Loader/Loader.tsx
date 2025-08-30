import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.container}>
    <p>Loading database CO₂… (might take long time for big file)</p>
    <div className={styles.loader}></div>
  </div>
);
