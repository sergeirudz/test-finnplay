import styles from './Columns.module.scss';

type Props = {
  title: string;
  setColumns: (option: string) => void;
};

const Columns = ({ title, setColumns }: Props) => {
  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <input
        type="range"
        min="2"
        max="4"
        step="1"
        onChange={(e) => setColumns(e.target.value)}
      />
    </div>
  );
};

export default Columns;
