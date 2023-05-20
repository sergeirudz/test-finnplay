import { useState } from 'react';
import styles from './Columns.module.scss';

type Props = {
  title: string;
};

const Columns = ({ title }: Props) => {
  const [columns, setColumns] = useState();

  const handleChange = (e) => {
    setColumns(e.target.value);
    console.log('columns', columns);
  };

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <input
        type="range"
        min="1"
        max="3"
        step="1"
        value={columns}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Columns;
