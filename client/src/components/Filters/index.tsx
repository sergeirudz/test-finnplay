import { useState } from 'react';
import Columns from './Columns';
import Groups, { CheckedItems } from './Groups';
import Search from './Search';
import Sort from './Sort';
import styles from './index.module.scss';
import Reset from './Reset';
import { useQueryClient } from '@tanstack/react-query';
import { useIsFetching } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setGroups, setProviders } from '../../store/slices/filterSlice';

type Props = {
  setColumns: (option: string) => void;
};

const Filters = ({ setColumns }: Props) => {
  const [hidden, setHidden] = useState(false);
  const isFetching = useIsFetching();
  const dispatch = useDispatch();

  const sortProviders = (option: CheckedItems) => {
    dispatch(setProviders(option));
  };

  const sortGroups = (option: CheckedItems) => {
    dispatch(setGroups(option));
  };

  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['games']);

  return (
    <div className={`${styles.container} ${hidden && styles.hidden}`}>
      <Search />
      <Groups
        title="Providers"
        data={data?.data?.providers}
        sort={sortProviders}
        hidden={hidden}
        isFetching={isFetching}
      />
      <Groups
        title="Game groups"
        data={data?.data?.groups}
        sort={sortGroups}
        hidden={hidden}
        isFetching={isFetching}
      />
      <Sort title="Sorting" hidden={hidden} />
      <Columns title="columns" setColumns={setColumns} />
      <Reset hidden={hidden} />
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
