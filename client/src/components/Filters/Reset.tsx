import styles from './Reset.module.scss';

type Props = {
  games: number;
  reset: () => void;
  hidden?: boolean;
};

const Reset = ({ games, reset, hidden }: Props) => {
  return (
    <div
      className={styles.container}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <h4>Games amount: {games}</h4>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Reset;
