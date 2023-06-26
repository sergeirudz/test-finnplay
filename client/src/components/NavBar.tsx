import { useEffect } from 'react';
import styles from './NavBar.module.scss';
import { useLogoutUserMutation } from '../store/apis/authApi';
import { useAppSelector } from '../store';
import { selectUsername } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const username = useAppSelector(selectUsername);

  const navigate = useNavigate();
  const [logoutUser, { isLoading, isSuccess }] = useLogoutUserMutation();

  const handleLogout = async () => {
    logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a
          href="https://www.finnplay.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="/assets/logo.svg" alt="FinnPlay" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.username}>
              {username ? username : 'Not logged in'}
            </li>
            <li>
              <button onClick={handleLogout}>
                <img src="/assets/user.svg" alt="logout" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
