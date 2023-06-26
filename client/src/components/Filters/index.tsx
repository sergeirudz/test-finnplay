import { useEffect, useState } from 'react';
import Columns from './Columns';
import Groups, { CheckedItem } from './Groups';
import Search from './Search';
import Sort from './Sort';
import styles from './index.module.scss';
import Reset from './Reset';
import { useDispatch } from 'react-redux';
import {
  resetFilter,
  setFilterGroups,
  setFilterProviders,
} from '../../store/slices/filterSlice';
import { useGetGamesQuery } from '../../store/apis/gamesApi';

const Filters = () => {
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);

  const { data: gamesData } = useGetGamesQuery();

  const sortProviders = (option: CheckedItem) => {
    dispatch(setFilterProviders(option));
  };

  const sortGroups = (option: CheckedItem) => {
    dispatch(setFilterGroups(option));
  };

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setHidden(!isDesktop);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReset = () => {
    setReset(true);
    dispatch(resetFilter());
  };

  return (
    <div className={`${styles.container} ${hidden && styles.hidden}`}>
      <Search />

      <Groups
        title="Providers"
        data={gamesData?.providers}
        sort={sortProviders}
        hidden={hidden}
        reset={reset}
        onResetComplete={() => setReset(false)}
      />

      <Groups
        title="Game groups"
        data={gamesData?.groups}
        sort={sortGroups}
        hidden={hidden}
        reset={reset}
        onResetComplete={() => setReset(false)}
      />
      <Sort title="Sorting" hidden={hidden} />
      <Columns title="columns" />
      <Reset hidden={hidden} reset={handleReset} />
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
