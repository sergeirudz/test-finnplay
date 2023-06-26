import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Groups.module.scss';
import { Group, Provider } from '../GamesList';

type Props = {
  title: string;
  data: Item;
  sort: (items: CheckedItem) => void;
  hidden?: boolean;
  reset: boolean;
  onResetComplete: () => void;
};

type Item = Provider[] | Group[] | undefined;

export type CheckedItem = Record<any, any | number>;

const Groups = ({
  title,
  data = [],
  sort,
  hidden,

  reset,
  onResetComplete,
}: Props) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);

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
        checkedItems.filter((item: CheckedItem) => item.name !== name)
      );
    }
  };

  useEffect(() => {
    sort(checkedItems);
  }, [checkedItems, sort]);

  useEffect(() => {
    if (reset) {
      setCheckedItems([]);
      onResetComplete();
    }
  }, [reset, onResetComplete]);

  return (
    <div className={styles.item} style={{ display: hidden ? 'none' : 'block' }}>
      <h4>{title}</h4>
      <ul>
        {data.map((item: Provider | Group) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Groups;
