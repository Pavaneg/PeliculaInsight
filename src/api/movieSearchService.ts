import axios from "axios";

export const fetchMovies = async (query: string) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/search/movie", {
    params: { 
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      query: query,
     },
  });
  return response.data.results;
};