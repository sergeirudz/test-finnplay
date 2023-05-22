import { useSelector } from 'react-redux';
import GamesList from '../components/GamesList';
import NavBar from '../components/NavBar';
import styles from './Home.module.scss';
import { selectAuth } from '../store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!auth) {
      return navigate('/login');
    }
  }, [auth]);

  return (
    <div className={styles.container}>
      <NavBar />
      <GamesList />
    </div>
  );
};

export default Home;
