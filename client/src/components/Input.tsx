import { useId, useRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import ShowPasswordIcon from './ShowPasswordIcon';

type Props = {
  label: string;
  register: UseFormRegister<any>;
  required?: boolean;
  showIcon?: boolean | undefined;
  type: string;
};

const Input = ({ label, register, required, showIcon, type }: Props) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { onChange, name, ref } = register(label, { required });

  const handleFocus = () => {
    if (inputRef.current?.value !== '') return;
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (inputRef.current?.value !== '') return;
    setIsFocused(false);
  };

  return (
    <div className={styles.input}>
      <div className={styles.wrapper}>
        <label className={isFocused ? styles.active : ''} htmlFor={id}>
          {label}
        </label>
        <input
          onChange={onChange}
          name={name}
          type={type === 'password' && show ? 'text' : type}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
      </div>
      {showIcon && show ? (
        <ShowPasswordIcon
          onClick={() => setShow(!show)}
          active={show}
          style={{ zIndex: 2, paddingRight: '16px' }}
        />
      ) : showIcon ? (
        <ShowPasswordIcon
          onClick={() => setShow(!show)}
          active={show}
          style={{ zIndex: 2, paddingRight: '16px' }}
        />
      ) : null}
    </div>
  );
};

export default Input;
