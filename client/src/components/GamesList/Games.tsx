import styles from './Games.module.scss';
import Card from './Card';
import classNames from 'classnames';
import { Game, Group, Provider } from '.';
import {
  SortOptions,
  selectFilterColumns,
  selectFilterGroups,
  selectFilterProviders,
  selectFilterSearchTerm,
  selectFilterSortBy,
  selectFilteredGames,
  setFilterSearchTerm,
  setFilteredGames,
} from '../../store/slices/filterSlice';
import { useEffect } from 'react';
import { useGetGamesQuery } from '../../store/apis/gamesApi';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '../../store';

const Games = () => {
  const columnNumber = useSelector(selectFilterColumns);
  const columns = classNames({
    [styles.columns_2]: columnNumber === '2',
    [styles.columns_3]: columnNumber === '3',
    [styles.columns_4]: columnNumber === '4',
  });

  const dispatch = useDispatch();
  const filteredGames = useSelector(selectFilteredGames);

  const searchTerm = useSelector(selectFilterSearchTerm);
  const filterProviders = useSelector(selectFilterProviders);
  const filterGroups = useSelector(selectFilterGroups);
  const sortBy = useSelector(selectFilterSortBy);

  const {
    data: gamesData,
    isLoading,
    isSuccess: isGamesSuccess,
  } = useGetGamesQuery();

  useEffect(() => {
    if (isGamesSuccess) {
      dispatch(setFilteredGames(gamesData.games));
    }
  }, [gamesData, dispatch, isGamesSuccess]);

  useEffect(() => {
    if (isGamesSuccess) {
      dispatch(setFilterSearchTerm(''));

      const gamesFilteredByProviders = filterGamesByProviders(
        gamesData.games,
        filterProviders
      );

      const gamesFilteredByGroups = filterGamesByGroups(
        gamesFilteredByProviders,
        filterGroups
      );
      const sortedGames = sortGamesBy(gamesFilteredByGroups, sortBy);

      dispatch(setFilteredGames(sortedGames));
    }
  }, [
    filterProviders,
    filterGroups,
    sortBy,
    dispatch,
    isGamesSuccess,
    gamesData,
  ]);

  useEffect(() => {
    if (isGamesSuccess) {
      dispatch(
        setFilteredGames(filterGamesByName(gamesData.games, searchTerm))
      );
    }
  }, [searchTerm, dispatch, gamesData, isGamesSuccess]);

  return (
    <div className={`${styles.container} ${columns}`}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredGames?.map((game: Game, i) => <Card key={i} {...game} />)
      )}
    </div>
  );
};

export default Games;

function filterGamesByName(games: Game[], searchTerm: string) {
  return games.filter((game) => {
    const gameNameMatchesSearchTerm = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return gameNameMatchesSearchTerm;
  });
}

function filterGamesByProviders(games: Game[], providers: Provider[]): Game[] {
  if (providers.length === 0) return games;

  const filteredGames = games.filter((game) => {
    return providers.some((provider) => {
      return game.provider === provider.id;
    });
  });

  return filteredGames;
}

function filterGamesByGroups(games: Game[], group: Group[]): Game[] {
  if (group.length === 0) return games;

  const gameIds = group.flatMap((groupObj) => groupObj.games);
  return games.filter((game) => gameIds.includes(game.id));
}

function sortGamesBy(games: Game[], sortBy: SortOptions): Game[] {
  switch (sortBy) {
    case SortOptions.NAME_ASC:
      return games.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    case SortOptions.NAME_DESC:
      return games.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    case SortOptions.NEWEST:
      return games
        .slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    default:
      return games;
  }
}
