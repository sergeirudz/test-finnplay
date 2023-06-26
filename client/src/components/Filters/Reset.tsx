import { useSelector } from 'react-redux';
import styles from './Reset.module.scss';
import { selectFilteredGames } from '../../store/slices/filterSlice';

type Props = {
  hidden?: boolean;
  reset: () => void;
};

const Reset = ({ hidden, reset }: Props) => {
  const games = useSelector(selectFilteredGames);

  return (
    <div
      className={styles.container}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <h4>Games amount: {games.length}</h4>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Reset;
