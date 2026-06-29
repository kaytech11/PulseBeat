import api from "../api/axios";

export const searchSongs = async (query: string) => {
  const response = await api.get(`/search?q=${query}`);

  return response.data.songs;
};