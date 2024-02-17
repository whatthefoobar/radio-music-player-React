import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.sr.se/api/v2/";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Channels"],
  endpoints: (builder) => ({
    fetchRadioChannels: builder.query({
      query: () => "channels?format=json&indent=true&pagination=fals",
    }),
    fetchRadioPlaylistById: builder.query({
      query: (id, skipToken) =>
        `playlists/getplaylistbychannelid?id=${id}&format=json&indent=true`,
    }),
  }),
});

export const { useFetchRadioChannelsQuery, useFetchRadioPlaylistByIdQuery } =
  apiSlice;

export default apiSlice;
