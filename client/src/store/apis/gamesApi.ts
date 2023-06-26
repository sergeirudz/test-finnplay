import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';
import { Game, Group, Provider } from '../../components/GamesList';

interface GamesResponse {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getGames: builder.query<GamesResponse, void>({
      query() {
        return {
          url: 'games',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
