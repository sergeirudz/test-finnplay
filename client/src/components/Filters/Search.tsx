import { StylesConfig, components, DropdownIndicatorProps } from 'react-select';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectFilterSearchTerm,
  selectFilteredGames,
  setFilterSearchTerm,
} from '../../store/slices/filterSlice';
import { Game } from '../GamesList';
import AsyncSelect from 'react-select/async';
import { useAppSelector } from '../../store';

type SelectOptionType = {
  value: string;
  label: string;
};

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectFilterSearchTerm);
  const gamesData = useAppSelector(selectFilteredGames);

  const options = useMemo(() => {
    return gamesData.map((game: Game) => ({
      value: game.name,
      label: game.name,
    }));
  }, [gamesData]);

  const handleOptionChange = (e: SelectOptionType) => {
    dispatch(setFilterSearchTerm(e.value));
  };

  const filterGames = (inputValue: string) => {
    return options?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: SelectOptionType[]) => void
  ) => {
    callback(filterGames(inputValue) as SelectOptionType[]);
  };

  return (
    <>
      <AsyncSelect
        classNamePrefix="select"
        styles={customStyles}
        components={{ DropdownIndicator }}
        closeMenuOnSelect={true}
        name="Search"
        placeholder="Search"
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={options}
        onChange={(e) => handleOptionChange(e as SelectOptionType)}
        value={
          searchTerm !== ''
            ? options?.find((option) => option.value === searchTerm)
            : ''
        }
      />
    </>
  );
};

const customStyles: StylesConfig = {
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  container: (styles) => ({ ...styles, width: '100%' }),
  valueContainer: (styles) => ({ ...styles, padding: '22px 16px' }),
  input: (styles) => ({ ...styles, padding: 0, margin: 0 }),
  dropdownIndicator: (styles) => ({ ...styles, paddingRight: '16px' }),
  placeholder: (styles) => ({
    ...styles,
    color: '#808080',

    margin: 0,
    fontFamily: 'Prompt',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '120%',
  }),
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6848 10.5329L15.7621 14.6108C16.0792 14.9281 16.0803 15.4414 15.7594 15.7624C15.4407 16.0811 14.9195 16.0765 14.6081 15.765L10.5309 11.687C7.97003 13.6804 4.26578 13.5 1.91194 11.1457C-0.637312 8.59594 -0.637312 4.46202 1.91194 1.91229C4.46118 -0.637431 8.59433 -0.637431 11.1436 1.91229C13.4974 4.26658 13.6778 7.97152 11.6848 10.5329ZM9.98962 9.99149C11.9016 8.0792 11.9016 4.97876 9.98962 3.06647C8.07769 1.15417 4.97783 1.15417 3.06589 3.06647C1.15396 4.97876 1.15396 8.0792 3.06589 9.99149C4.97783 11.9038 8.07769 11.9038 9.98962 9.99149Z"
          fill="#808080"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

export default Search;
