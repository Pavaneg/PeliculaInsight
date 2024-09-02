import axios from "axios";

export const fetchGenre = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/genre/movie/list?language=es", {
        params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
      });
      return response.data.genres;
};
