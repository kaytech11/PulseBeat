import api from "../api/axios";

export const getLikedSongs =async () => {
    const { data } =await api.get("/likes");
    return data;
};

export const likeSong = async (songId : string ) => {
    const { data } = await api.post(`/likes/${songId}`);
    return data;
};

export const unlikeSong = async (songId: string) => {
  const { data } = await api.delete(`/likes/${songId}`);
  return data;
};