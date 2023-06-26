import { useSelector } from 'react-redux';
import styles from './Reset.module.scss';
import {
  resetFilter,
  selectFilteredGames,
} from '../../store/slices/filterSlice';
import { useDispatch } from 'react-redux';

type Props = {
  hidden?: boolean;
};

const Reset = ({ hidden }: Props) => {
  const dispatch = useDispatch();
  const games = useSelector(selectFilteredGames);

  return (
    <div
      className={styles.container}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <h4>Games amount: {games.length}</h4>
      <button onClick={() => dispatch(resetFilter())}>Reset</button>
    </div>
  );
};

export default Reset;
