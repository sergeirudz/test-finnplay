import { ReactNode } from 'react';
import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
};

const Button = ({ children, loading, ...rest }: Props) => {
  return (
    <button className={styles.button} {...rest}>
      {loading ? (
        <img
          src="/assets/loading.svg"
          height="14px"
          width="14px"
          className={styles.loading}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
