import GamesList from '../components/GamesList';
import NavBar from '../components/NavBar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <GamesList />
    </div>
  );
};

export default Home;
