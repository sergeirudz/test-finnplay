import { useSelector } from 'react-redux';
import GamesList from '../components/GamesList';
import NavBar from '../components/NavBar';
import styles from './Home.module.scss';
import { selectAuth } from '../store/slices/authSlice';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';
import { redirect } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!auth) {
      console.log("navigate('/login');");
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
