

import axios from "axios";

const API_URL = "http://localhost:5000/api/songs";

export const uploadSong = async (
  formData: FormData
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSongs = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};