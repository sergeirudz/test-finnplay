import Filters from '../Filters';
import Games from './Games';
import styles from './index.module.scss';

export type Game = {
  cover: string;
  coverLarge: string;
  date: string;
  id: number;
  name: string;
  provider: number;
};

export type Group = {
  games: number[];
  id: number;
  name: string;
};

export type Provider = {
  id: number;
  logo: string;
  name: string;
};

const GamesList = () => {
  return (
    <main className={styles.main}>
      <Games />
      <Filters />
    </main>
  );
};

export default GamesList;
