import { loadAbort } from "../utilities";
import { axiosInstance } from "../api";

export const articApiService = (page: number, limit = 30) => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
