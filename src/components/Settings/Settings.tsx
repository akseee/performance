import styles from "./Settings.module.css";
import React from "react";

interface SettingsProps {
  availableFields: string[];
  selectedFields: string[];
  onChange: (fields: string[]) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  availableFields,
  selectedFields,
  onChange,
}) => {
  const handleToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      onChange(selectedFields.filter((f) => f !== field));
    } else {
      onChange([...selectedFields, field]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select columns</h3>
      <ul className={styles.fieldList}>
        {availableFields.map((field) => (
          <li key={field}>
            <label>
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => handleToggle(field)}
              />
              {field}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
