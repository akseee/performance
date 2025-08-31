import { useCallback, type ChangeEvent } from "react";
import styles from "./FormHandlers.module.css";
import { useDispatch } from "../../app/store/store";
import { appActions } from "../../app/store/applicationSlice";

export const FormHandlers = () => {
  const dispatch = useDispatch();

  const handleYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(appActions.changeYear(Number(e.target.value)));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(appActions.changeQuery(e.target.value));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(appActions.changeSort(e.target.value));
    },
    [dispatch]
  );

  return (
    <div className={styles.controls}>
      <label>
        Search:
        <input
          id="query"
          type="text"
          onChange={handleSearchChange}
          className={styles.input}
          placeholder="Enter country name..."
        />
      </label>
      <label>
        Year:
        <input
          id="year"
          onChange={handleYearChange}
          className={styles.input}
          type="number"
          min={1800}
          max={2023}
        ></input>
      </label>
      <label>
        Sort by:
        <select id="sort" onChange={handleSortChange} className={styles.input}>
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
          <option value="population-asc">Population (↑)</option>
          <option value="population-desc">Population (↓)</option>
        </select>
      </label>
    </div>
  );
};
