import Filters from './Filters';
import Games from './Games';
import styles from './GamesList.module.scss';

type Props = {};

const GamesList = (props: Props) => {
  return (
    <main className={styles.main}>
      <Games />
      <Filters />
    </main>
  );
};

export default GamesList;
