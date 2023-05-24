import { useState } from 'react';
import Filters from '../Filters';
import Games from './Games';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { setNrOfGames } from '../../store/slices/filterSlice';

export type Game = {
  cover: string;
  coverLarge: string;
  date: string;
  id: number;
  name: string;
  provider: number;
};

export type Group = {
  games: number[];
  id: number;
  name: string;
};

export type Provider = {
  id: number;
  logo: string;
  name: string;
};

const GamesList = () => {
  const [columnNumber, setColumnNumber] = useState<string>('4');

  const setColumns = (option: string) => {
    setColumnNumber(option);
  };

  useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const refresh = await axios.post(
        'user/refresh',
        {},
        { withCredentials: true }
      );

      const token = refresh.data.token;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      return await axios.get('/games', {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (data) => {
      setNrOfGames(data.data.games.length);
    },
  });

  return (
    <main className={styles.main}>
      <Games columnNumber={columnNumber} />
      <Filters setColumns={setColumns} />
    </main>
  );
};

export default GamesList;
