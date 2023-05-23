import { useEffect } from 'react';
import styles from './NavBar.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  selectUsername,
  setAuth,
  setUsername,
} from '../store/slices/authSlice';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('user/user');
        dispatch(setUsername(data.username));
        dispatch(setAuth(true));
      } catch (error) {
        dispatch(setAuth(false));
      }
    })();
  }, []);

  const handleLogout = async () => {
    await axios.post('user/logout', {}, { withCredentials: true });
    axios.defaults.headers.common['Authorization'] = '';
    dispatch(setAuth(false));
    dispatch(setUsername(''));
    navigate('/login');
  };

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
