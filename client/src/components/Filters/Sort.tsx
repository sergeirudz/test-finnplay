import { ChangeEvent, useState } from 'react';
import styles from './Sort.module.scss';

type Props = {
  sort: (sort: string) => void;
  title: string;
};

export enum SortOptions {
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  NEWEST = 'newest',
}

const Sort = ({ sort, title }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOption(value);
    sort(value);
  };

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <ul className={styles.sorting}>
        <li
          className={`${styles.option} ${
            selectedOption === SortOptions.NAME_ASC && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value={SortOptions.NAME_ASC}
              checked={selectedOption === SortOptions.NAME_ASC}
              onChange={handleSortChange}
            />
            A-Z
          </label>
        </li>
        <li
          className={`${styles.option} ${
            selectedOption === SortOptions.NAME_DESC && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value={SortOptions.NAME_DESC}
              checked={selectedOption === SortOptions.NAME_DESC}
              onChange={handleSortChange}
            />
            Z-A
          </label>
        </li>
        <li
          className={`${styles.option} ${
            selectedOption === SortOptions.NEWEST && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value="newest"
              checked={selectedOption === 'newest'}
              onChange={handleSortChange}
            />
            Newest
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
