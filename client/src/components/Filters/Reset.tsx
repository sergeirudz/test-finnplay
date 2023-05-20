import styles from './Reset.module.scss';

type Props = {
  games: number;
  reset: () => void;
};

const Reset = ({ games, reset }: Props) => {
  return (
    <div className={styles.container}>
      <h4>Games amount: {games}</h4>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Reset;
