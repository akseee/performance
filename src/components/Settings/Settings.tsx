import { appActions, getAllSettings } from "../../app/store/applicationSlice";
import { useDispatch, useSelector } from "../../app/store/store";
import { settings } from "../../utils/contants";
import type { CO2Data } from "../../utils/types.types";
import styles from "./Settings.module.css";

export const Settings = () => {
  const dispatch = useDispatch();
  const selectedFields = useSelector(getAllSettings);

  const handleToggle = (field: keyof CO2Data) => {
    if (selectedFields.includes(field)) {
      dispatch(appActions.removeSetting(field));
    } else {
      dispatch(appActions.addSetting(field));
    }
  };

  const handleClear = () => {
    dispatch(appActions.clearSettings());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select columns</h3>
      <button onClick={handleClear}>Clear</button>
      <ul className={styles.fieldList}>
        {settings.map((field, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedFields.includes(field as keyof CO2Data)}
                onChange={() => handleToggle(field as keyof CO2Data)}
              />
              {field}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
