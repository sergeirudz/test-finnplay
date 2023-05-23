import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Group, Provider } from '../../components/GamesList';

type FilterState = {
  providers: Provider[];
  groups: Group[];
  sorting: SortOptions;
  nrOfGames?: number;
  sortByName: { [key: string]: string | number } | null;
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
  sortByName: null,
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
      state.sortByName = null;
    },
    setNrOfGames: (state, action) => {
      state.nrOfGames = action.payload;
    },
    setSortByName: (state, action) => {
      state.sortByName = action.payload;
    },
  },
});

export const {
  setProviders,
  setGroups,
  setSorting,
  resetFilter,
  setNrOfGames,
  setSortByName,
} = filterSlice.actions;
export const selectProviders = (state: RootState) => state.filter.providers;
export const selectGroups = (state: RootState) => state.filter.groups;
export const selectSorting = (state: RootState) => state.filter.sorting;
export const selectNrOfGames = (state: RootState) => state.filter.nrOfGames;
export const selectSortByName = (state: RootState) => state.filter.sortByName;

export default filterSlice.reducer;
