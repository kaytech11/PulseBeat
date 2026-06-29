import api from "../api/axios";

export const getPlaylists = async () => {
  const { data } = await api.get("/playlists");
  return data.playlists;
};

export const createPlaylist = async (
  name: string,
  description?: string
) => {
  const { data } = await api.post("/playlists", {
    name,
    description,
  });

  return data.playlist;
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string
) => {
  const { data } = await api.post(
    `/playlists/${playlistId}/songs/${songId}`
  );

  return data;
};