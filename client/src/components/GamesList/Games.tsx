import styles from './Games.module.scss';
import Card from './Card';
import classNames from 'classnames';
import { Game, Group, Provider } from '.';
import {
  SortOptions,
  selectGroups,
  selectProviders,
  selectSortByName,
  selectSorting,
  setNrOfGames,
} from '../../store/slices/filterSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

type Props = {
  columnNumber: string;
};

const Games = ({ columnNumber }: Props) => {
  const [games, setGames] = useState<Game[] | undefined>([]);
  const providers = useSelector(selectProviders);
  const groups = useSelector(selectGroups);
  const sorting = useSelector(selectSorting);
  const sortByName = useSelector(selectSortByName);
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const columns = classNames({
    [styles.columns_2]: columnNumber === '2',
    [styles.columns_3]: columnNumber === '3',
    [styles.columns_4]: columnNumber === '4',
  });

  const filterByProviders = (games: Game[], providers: Provider[]): Game[] => {
    if (providers.length === 0) return games;

    const filteredGames = games.filter((game) => {
      return providers.some((provider) => {
        return game.provider === provider.id;
      });
    });

    return filteredGames;
  };

  const filterByGroup = (games: Game[], group: Group[]): Game[] => {
    if (group.length === 0) return games;

    const gameIds = group.flatMap((groupObj) => groupObj.games);
    return games.filter((game) => gameIds.includes(game.id));
  };

  const mergeFilteredGames = (gamesArr1: Game[], gamesArr2: Game[]): Game[] => {
    const combinedArr = [...gamesArr1, ...gamesArr2];
    const uniqueGames = Array.from(new Set(combinedArr));
    return uniqueGames;
  };

  const sortGames = (games: Game[], order: SortOptions): Game[] => {
    let sortedGames;

    if (order === SortOptions.NAME_ASC) {
      sortedGames = games.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === SortOptions.NAME_DESC) {
      sortedGames = games.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === SortOptions.NEWEST) {
      sortedGames = games.sort(
        (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
      );
    } else {
      sortedGames = games.sort(
        (a, b) => (new Date(a.date) as any) - (new Date(b.date) as any)
      );
    }

    return sortedGames;
  };

  const findGameById = (
    games: Game[],
    id: string | number
  ): Game | undefined => {
    return games.find((game) => game.id === id);
  };

  useEffect(() => {
    (async () => {
      const data: any = await queryClient.getQueryData(['games']);
      setGames(data?.data?.games);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data: any = await queryClient.getQueryData(['games']);

      const gamesFilteredByProviders = filterByProviders(
        data?.data?.games,
        providers
      );
      const gamesFilteredByGroup = filterByGroup(data?.data?.games, groups);

      const filteredGames = mergeFilteredGames(
        gamesFilteredByProviders,
        gamesFilteredByGroup
      );
      const sortedGames = sortGames(filteredGames, sorting);

      if (sortByName !== null) {
        const foundGameByName = findGameById(data.data.games, sortByName.id);

        const arr = [];
        arr.push(foundGameByName as any);
        setGames(arr);
        console.log('foundGameByName', foundGameByName);
      } else if (groups.length === 0 && providers.length !== 0) {
        setGames(gamesFilteredByProviders);
        dispatch(setNrOfGames(gamesFilteredByProviders.length));
      } else if (providers.length === 0 && groups.length !== 0) {
        setGames(gamesFilteredByGroup);
        dispatch(setNrOfGames(gamesFilteredByGroup.length));
      } else if (groups.length !== 0 && providers.length !== 0) {
        setGames(filteredGames);
        dispatch(setNrOfGames(filteredGames.length));
      } else {
        setGames(sortedGames);
        dispatch(setNrOfGames(sortedGames.length));
      }
    })();
  }, [providers, groups, sorting, sortByName]);

  return (
    <div className={`${styles.container} ${columns}`}>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        games?.map((game: Game, i) => <Card key={i} {...game} />)
      )}
    </div>
  );
};

export default Games;
