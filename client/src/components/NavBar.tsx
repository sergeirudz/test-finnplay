import styles from './NavBar.module.scss';

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
        <nav className={styles.nav}>
          <ul>
            <li>Player 1</li>
            <li>
              <img src="/assets/user.svg" alt="logout" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
