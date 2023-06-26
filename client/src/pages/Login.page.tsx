import LoginForm from '../components/LoginForm';
import styles from './Login.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
