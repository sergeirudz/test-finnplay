import { useState } from 'react';
import Columns from './Columns';
import Groups, { CheckedItems } from './Groups';
import Search from './Search';
import Sort from './Sort';
import styles from './index.module.scss';
import Reset from './Reset';

type Props = {
  setColumns: (option: string) => void;
};

const Filters = ({ setColumns }: Props) => {
  const [games, setGames] = useState();
  const [hidden, setHidden] = useState(false);

  const sortGames = (option) => {
    const sortedGames = [...games];

    switch (option) {
      case 'name-asc':
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
      // TODO add sort by date newest
    }

    setGames(sortedGames);
  };

  const sortProviders = (option: CheckedItems) => {
    console.log('sortProviders', option);
  };

  const sortGroups = (option: CheckedItems) => {
    console.log('sortGroups', option);
  };

  const handleReset = () => {
    console.log('reset');
  };

  // const setColumns = (option: string) => {
  //   console.log('setColumns', option);
  // };

  return (
    <div className={`${styles.container} ${hidden && styles.hidden}`}>
      <Search />
      <Groups
        title="Providers"
        data={PROVIDERS}
        sort={sortProviders}
        hidden={hidden}
      />
      <Groups
        title="Game groups"
        data={GROUPS}
        sort={sortGroups}
        hidden={hidden}
      />
      <Sort title="Sorting" sort={sortGames} hidden={hidden} />
      <Columns title="columns" setColumns={setColumns} />
      <Reset games={3800} reset={handleReset} hidden={hidden} />
      <button
        className={styles.hideFiltersBtn}
        onClick={() => setHidden(!hidden)}
      >
        <img
          src="/assets/hamburger.svg"
          alt="arrow"
          height="14px"
          width="14px"
        />
        <span>Hide filters</span>
      </button>
    </div>
  );
};

export default Filters;

const PROVIDERS = [
  {
    id: 1,
    name: 'Play n’ Go',
  },
  {
    id: 2,
    name: 'Yggdrasil',
  },
  {
    id: 3,
    name: 'Pragmatic',
  },
  {
    id: 4,
    name: 'Microgaming',
  },
  {
    id: 5,
    name: 'NetEnt',
  },
  {
    id: 6,
    name: 'Altenar',
  },
  {
    id: 7,
    name: 'Ezugi',
  },
  {
    id: 8,
    name: 'GameArt',
  },
  {
    id: 9,
    name: 'Red Tiger',
  },
  {
    id: 10,
    name: 'Evolution',
  },
  {
    id: 11,
    name: 'Relax Gaming',
  },
  {
    id: 12,
    name: 'Evoplay',
  },
];

const GROUPS = [
  {
    id: 1,
    name: 'Slots',
  },
  {
    id: 2,
    name: 'Blackjack',
  },
  {
    id: 3,
    name: 'Jackpot',
  },
  {
    id: 4,
    name: 'Live',
  },
  {
    id: 5,
    name: 'Bingo',
  },
  {
    id: 6,
    name: 'Baccarat',
  },
  {
    id: 7,
    name: 'Roulette',
  },
  {
    id: 8,
    name: 'Poker',
  },
];
