import styles from './Sort.module.scss';
import { useDispatch } from 'react-redux';
import {
  SortOptions,
  selectFilterSortBy,
  setFilterSortBy,
} from '../../store/slices/filterSlice';
import { useSelector } from 'react-redux';

type Props = {
  title: string;
  hidden?: boolean;
};

const Sort = ({ title, hidden }: Props) => {
  const dispatch = useDispatch();
  const sorting = useSelector(selectFilterSortBy);

  return (
    <div
      className={styles.container}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <h4>{title}</h4>
      <ul className={styles.sorting}>
        <li
          className={`${styles.option} ${
            sorting === SortOptions.NAME_ASC && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value={SortOptions.NAME_ASC}
              checked={sorting === SortOptions.NAME_ASC}
              onChange={() => dispatch(setFilterSortBy(SortOptions.NAME_ASC))}
            />
            A-Z
          </label>
        </li>
        <li
          className={`${styles.option} ${
            sorting === SortOptions.NAME_DESC && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value={SortOptions.NAME_DESC}
              checked={sorting === SortOptions.NAME_DESC}
              onChange={() => dispatch(setFilterSortBy(SortOptions.NAME_DESC))}
            />
            Z-A
          </label>
        </li>
        <li
          className={`${styles.option} ${
            sorting === SortOptions.NEWEST && styles.active
          }`}
        >
          <label>
            <input
              type="radio"
              name="sort-option"
              value={SortOptions.NEWEST}
              checked={sorting === SortOptions.NEWEST}
              onChange={() => dispatch(setFilterSortBy(SortOptions.NEWEST))}
            />
            Newest
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
