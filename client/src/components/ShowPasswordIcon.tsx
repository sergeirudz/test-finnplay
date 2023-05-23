import React from 'react';

type Props = {
  active: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
};

const ShowPasswordIcon = ({ active, ...rest }: Props) => {
  return (
    <svg
      width="35"
      height="auto"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8 0C3.65688 0 0.24223 4.50891 0.0999436 4.7C-0.0333145 4.87768 -0.0333145 5.12232 0.0999436 5.3C0.243025 5.49197 3.65757 10 8 10C12.3424 10 15.7578 5.49109 15.9001 5.3C16.0333 5.12232 16.0333 4.87768 15.9001 4.7C15.7576 4.50893 12.3431 0 8 0ZM8 9C4.76449 9 1.96224 5.97543 1.14224 5C1.96167 4.02457 4.76438 1 8 1C11.2356 1 14.0378 4.02457 14.8578 5C14.0381 5.97543 11.2356 9 8 9Z"
        fill={active ? 'green' : '#808080'}
      />
      <path
        d="M7.99992 2.49999C7.33695 2.49999 6.70106 2.76338 6.23202 3.2321C5.76327 3.70108 5.4999 4.33702 5.4999 4.99999C5.4999 5.66296 5.7633 6.29885 6.23202 6.76788C6.701 7.23662 7.33695 7.49999 7.99992 7.49999C8.6629 7.49999 9.29879 7.2366 9.76782 6.76788C10.2366 6.2989 10.4999 5.66296 10.4999 4.99999C10.499 4.33725 10.2354 3.70176 9.76691 3.23302C9.29815 2.76449 8.66267 2.5009 7.99992 2.49999ZM7.99992 6.49999C7.60215 6.49999 7.22043 6.34196 6.93923 6.0607C6.65803 5.77945 6.49994 5.39773 6.49994 5.00002C6.49994 4.6023 6.65797 4.22053 6.93923 3.93933C7.22048 3.65813 7.60221 3.50005 7.99992 3.50005C8.39764 3.50005 8.77941 3.65808 9.06062 3.93933C9.34182 4.22059 9.4999 4.6023 9.4999 5.00002C9.4999 5.39773 9.34187 5.7795 9.06062 6.0607C8.77936 6.3419 8.39764 6.49999 7.99992 6.49999Z"
        fill={active ? 'green' : '#808080'}
      />
    </svg>
  );
};

export default ShowPasswordIcon;
