import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/api/songs`;

// export const uploadSong = async (
//   formData: FormData
// ) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.post(
//     `${API_URL}/upload`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };

export const uploadSong = async (
  formData: FormData,
  onUploadProgress?: (progress: number) => void
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const progress = Math.round(
          (progressEvent.loaded * 100) /
          progressEvent.total
        );

        onUploadProgress?.(progress);
      },
    }
  );

  return response.data;
};

export const getSongs = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const streamSong = async (songId: string) => {
  const response = await axios.get(`${API_URL}/stream/${songId}`
);
 return response.data.song;
};

// delete  song by its ID
// export const deleteSong = async (songId: string) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.delete(
//     `${API_URL}/${songId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };