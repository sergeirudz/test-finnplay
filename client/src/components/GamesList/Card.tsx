import styles from './Card.module.scss';
import { Game } from '.';

const Card = (props: Game) => {
  const { cover, name } = props;
  return (
    <div className={styles.card}>
      <img src={cover} alt={name} title={name} />
    </div>
  );
};

export default Card;
