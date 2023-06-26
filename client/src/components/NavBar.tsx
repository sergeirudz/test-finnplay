import { useEffect } from 'react';
import styles from './NavBar.module.scss';
import { useLogoutUserMutation } from '../store/apis/authApi';

const NavBar = () => {
  const username = '123';

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
        <nav className={styles.nav}>
          <ul>
            <li>{username ? username : 'Not logged in'}</li>
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
