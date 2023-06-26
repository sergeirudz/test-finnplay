import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Game, Group, Provider } from '../../components/GamesList';

type FilterState = {
  providers: Provider[];
  games: Game[];
  filteredGames: Game[];
  groups: Group[];

  filterOptions: {
    filterProviders: Provider[];
    filterGroups: Group[];
    filterSearchTerm: string;
    filterSortBy: SortOptions;
    filterColumns: string;
  };
};

export enum SortOptions {
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  NEWEST = 'newest',
}

const initialState: FilterState = {
  games: [],
  filteredGames: [],
  providers: [],
  groups: [],

  filterOptions: {
    filterProviders: [],
    filterGroups: [],
    filterSearchTerm: '',
    filterSortBy: SortOptions.NEWEST,
    filterColumns: '4',
  },
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

    setFilteredGames: (state, action) => {
      state.filteredGames = action.payload;
    },
    setFilterProviders: (state, action) => {
      state.filterOptions.filterProviders = action.payload;
    },
    setFilterGroups: (state, action) => {
      state.filterOptions.filterGroups = action.payload;
    },
    setFilterSearchTerm: (state, action) => {
      state.filterOptions.filterSearchTerm = action.payload;
    },
    setFilterSortBy: (state, action) => {
      state.filterOptions.filterSortBy = action.payload;
    },
    setFilterColumns: (state, action) => {
      state.filterOptions.filterColumns = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  setProviders,
  setGroups,
  setFilteredGames,
  setFilterProviders,
  setFilterGroups,
  setFilterSearchTerm,
  setFilterSortBy,
  setFilterColumns,
  resetFilter,
} = filterSlice.actions;

export const selectGames = (state: RootState) => state.filter.games;
export const selectFilteredGames = (state: RootState) =>
  state.filter.filteredGames;
export const selectProviders = (state: RootState) => state.filter.providers;
export const selectGroups = (state: RootState) => state.filter.groups;

export const selectFilterProviders = (state: RootState) =>
  state.filter.filterOptions.filterProviders;
export const selectFilterGroups = (state: RootState) =>
  state.filter.filterOptions.filterGroups;
export const selectFilterSearchTerm = (state: RootState) =>
  state.filter.filterOptions.filterSearchTerm;
export const selectFilterSortBy = (state: RootState) =>
  state.filter.filterOptions.filterSortBy;
export const selectFilterColumns = (state: RootState) =>
  state.filter.filterOptions.filterColumns;

export default filterSlice.reducer;
