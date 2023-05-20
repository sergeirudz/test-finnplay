import styles from './Games.module.scss';
import Card from './Card';

type Props = {};

const Games = (props: Props) => {
  return (
    <div className={styles.container}>
      {DATA2.map((game, i) => (
        <Card key={i} {...game} />
      ))}
    </div>
  );
};

export default Games;

const DATA = [
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
  {
    title: 'Game',
    image: 'https://placehold.co/196x141',
    url: '#',
  },
];

const DATA2 = [...DATA, ...DATA, ...DATA];
