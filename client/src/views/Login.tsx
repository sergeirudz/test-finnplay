import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { selectAuth } from '../store/slices/authSlice';
import styles from './Login.module.scss';
import { redirect, useNavigate } from 'react-router';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (auth) {
      console.log("navigate('/');");
      return navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default Login;
