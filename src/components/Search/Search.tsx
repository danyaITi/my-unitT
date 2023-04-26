import { ChangeEvent } from "react";
import styles from "./Search.module.css";
import cn from "classnames";

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  children?: string;
}

const Search = ({
  children = "Лейбл",
  placeholder = "Поиск",
  ...props
}: SearchProps) => {
  const inputClass = cn({
    [styles.active]: props.value.length > 3,
  });

  return (
    <div>
      <label className={styles.label}>
        {children}
        <input
          className={inputClass}
          type="text"
          {...props}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default Search;
