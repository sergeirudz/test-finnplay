import GamesList from '../components/GamesList';
import NavBar from '../components/NavBar';
import styles from './Games.module.scss';

const GamesPage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <GamesList />
    </div>
  );
};

export default GamesPage;
