import styles from './Columns.module.scss';
import {
  selectFilterColumns,
  setFilterColumns,
} from '../../store/slices/filterSlice';
import { useAppSelector, useAppDispatch as useDispatch } from '../../store';
import classNames from 'classnames';

type Props = {
  title: string;
};

const Columns = ({ title }: Props) => {
  const dispatch = useDispatch();
  const columnNumber = useAppSelector(selectFilterColumns);

  const columns = classNames({
    [styles.columns_2]: columnNumber === '2',
    [styles.columns_3]: columnNumber === '3',
    [styles.columns_4]: columnNumber === '4',
  });

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <div className={`${styles.range} ${columns}`}>
        <input
          type="range"
          min="2"
          max="4"
          step="1"
          onChange={(e) => dispatch(setFilterColumns(e.target.value))}
        />
        <div className={`${styles.stepNumbers}`}>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
        <div className={`${styles.range}`}></div>
      </div>
    </div>
  );
};

export default Columns;
