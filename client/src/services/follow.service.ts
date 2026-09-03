import api from "../api/axios";

export const followArtist = async (
  artistId: string
) => {
  const { data } = await api.post(
    `/follows/${artistId}`
  );

  return data;
};

export const unfollowArtist = async (
  artistId: string
) => {
  const { data } = await api.delete(
    `/follows/${artistId}`
  );

  return data;
};

export const getFollowedArtists = async () => {
  const { data } = await api.get("/follows");

  return data;
};