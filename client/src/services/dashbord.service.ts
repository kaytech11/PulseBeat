import api from "../api/axios";

export const getArtistDashboard = async () => {
  const { data } = await api.get("/dashboard/artist");
  return data;
};