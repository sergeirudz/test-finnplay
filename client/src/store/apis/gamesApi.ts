import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';
import { Game, Group, Provider } from '../../components/GamesList';
import { setFilteredGames } from '../slices/filterSlice';

interface GamesResponse {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: customFetchBase,
  tagTypes: ['games'],
  endpoints: (builder) => ({
    getGames: builder.query<GamesResponse, void>({
      query() {
        return {
          url: 'games',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        };
      },
      providesTags: ['games'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        await dispatch(setFilteredGames(data.games));
      },
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
