import { ChangeEvent, useState } from 'react';
import styles from './Groups.module.scss';

type Props = {
  title: string;
  data: { id: number; name: string }[];
  sort: (items: CheckedItems) => void;
  hidden?: boolean;
};

export type CheckedItems = string[];

const Groups = ({ title, data, sort, hidden }: Props) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, name] as never);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== name));
    }

    sort(checkedItems);
  };

  return (
    <div className={styles.item} style={{ display: hidden ? 'none' : 'block' }}>
      <h4>{title}</h4>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className={
              checkedItems.includes(item.name as never) ? styles.active : ''
            }
          >
            <input
              type="checkbox"
              name={item.name}
              id={item.name}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
              style={{
                position: 'absolute',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
            <label htmlFor={item.name} style={{ cursor: 'pointer' }}>
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

type ItemProps = {
  name: string;
};

export default Groups;
