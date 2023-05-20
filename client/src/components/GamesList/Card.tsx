import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

type Props = {};

const Card = (props: Props) => {
  return (
    <Link to="#" className={styles.card}>
      <img src="https://placehold.co/196x141" alt="Game" />
    </Link>
  );
};

export default Card;
