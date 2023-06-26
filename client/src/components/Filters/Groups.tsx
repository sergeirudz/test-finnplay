import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Groups.module.scss';
import { Group, Provider } from '../GamesList';
import { useSelector } from 'react-redux';
import {
  SortOptions,
  selectGroups,
  selectProviders,
  selectFilterSortBy,
} from '../../store/slices/filterSlice';

type Props = {
  title: string;
  data: Item;
  sort: (items: CheckedItems) => void;
  hidden?: boolean;
};

type Item = Provider[] | Group[] | undefined;

export type CheckedItems = string[];

const Groups = ({ title, data = [], sort, hidden }: Props) => {
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const providers = useSelector(selectProviders);
  const groups = useSelector(selectGroups);
  const sorting = useSelector(selectFilterSortBy);
  // const isLoading = useSelector(selectIsLoading);
  const isLoading = false;

  useEffect(() => {
    if (
      providers.length === 0 &&
      groups.length === 0 &&
      sorting === SortOptions.NEWEST
    ) {
      setCheckedItems([]);
    }
  }, [providers, groups, sorting]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    item: Provider | Group
  ) => {
    const name = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((item: Provider | Group) => item.name !== name)
      );
    }
  };

  useEffect(() => {
    sort(checkedItems);
  }, [checkedItems]);

  return (
    <div className={styles.item} style={{ display: hidden ? 'none' : 'block' }}>
      <h4>{title}</h4>
      <ul>
        {isLoading && data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          data.map((item: Provider | Group) => (
            <li
              key={item.id}
              className={
                checkedItems.includes(item as never) ? styles.active : ''
              }
            >
              <input
                type="checkbox"
                name={item.name}
                id={item.name}
                onChange={(e) => handleCheckboxChange(e, item)}
                className={styles.checkbox}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  cursor: 'pointer',
                }}
                checked={checkedItems.includes(item as never)}
              />
              <label
                htmlFor={item.name}
                style={{
                  cursor: 'pointer',
                }}
              >
                {item.name}
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Groups;
