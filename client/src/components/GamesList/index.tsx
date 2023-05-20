import { useState } from 'react';
import Filters from '../Filters';
import Games from './Games';
import styles from './index.module.scss';

type Props = {};

const GamesList = (props: Props) => {
  const [columnNumber, setColumnNumber] = useState<string>('4');

  const setColumns = (option: string) => {
    setColumnNumber(option);
  };

  return (
    <main className={styles.main}>
      <Games columnNumber={columnNumber} />
      <Filters setColumns={setColumns} />
    </main>
  );
};

export default GamesList;
