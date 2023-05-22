import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Group, Provider } from '../../components/GamesList';

type FilterState = {
  providers: Provider[];
  groups: Group[];
  sorting: SortOptions;
  nrOfGames?: number;
};

export enum SortOptions {
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  NEWEST = 'newest',
}

const initialState: FilterState = {
  providers: [],
  groups: [],
  sorting: SortOptions.NEWEST,
  nrOfGames: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    resetFilter: (state) => {
      state.providers = [];
      state.groups = [];
      state.sorting = SortOptions.NEWEST;
    },
    setNrOfGames: (state, action) => {
      state.nrOfGames = action.payload;
    },
  },
});

export const {
  setProviders,
  setGroups,
  setSorting,
  resetFilter,
  setNrOfGames,
} = filterSlice.actions;
export const selectProviders = (state: RootState) => state.filter.providers;
export const selectGroups = (state: RootState) => state.filter.groups;
export const selectSorting = (state: RootState) => state.filter.sorting;
export const selectNrOfGames = (state: RootState) => state.filter.nrOfGames;

export default filterSlice.reducer;
