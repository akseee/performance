import { settings } from "../../utils/contants";
import type { CO2Data } from "../../utils/types.types";
import styles from "./Settings.module.css";
import React from "react";

interface SettingsProps {
  selectedFields: Array<keyof CO2Data>;
  onChange: (fields: Array<keyof CO2Data>) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  selectedFields,
  onChange,
}) => {
  const handleToggle = (field: keyof CO2Data) => {
    if (selectedFields.includes(field)) {
      onChange(selectedFields.filter((f) => f !== field));
    } else {
      onChange([...selectedFields, field]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select columns</h3>
      <button
        onClick={() => {
          onChange([]);
        }}
      >
        Clear
      </button>
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
