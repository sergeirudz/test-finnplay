import styles from './Games.module.scss';
import Card from './Card';
import classNames from 'classnames';

type Props = {
  columnNumber: string;
};

const Games = ({ columnNumber }: Props) => {
  const columns = classNames({
    [styles.columns_2]: columnNumber === '2',
    [styles.columns_3]: columnNumber === '3',
    [styles.columns_4]: columnNumber === '4',
  });

  return (
    <div className={`${styles.container} ${columns}`}>
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
