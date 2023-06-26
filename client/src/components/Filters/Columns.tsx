// import { useDispatch } from 'react-redux';
import styles from './Columns.module.scss';
import { setFilterColumns } from '../../store/slices/filterSlice';
import { useAppDispatch as useDispatch } from '../../store';

type Props = {
  title: string;
};

const Columns = ({ title }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <input
        type="range"
        min="2"
        max="4"
        step="1"
        onChange={(e) => dispatch(setFilterColumns(e.target.value))}
      />
    </div>
  );
};

export default Columns;
