import axiosInstance from "../api/axios";

export const getHomeFeed = async () => {
    const response = await axiosInstance.get("/home");
    return response.data;
};