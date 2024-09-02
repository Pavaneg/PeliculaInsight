import axios from "axios";

export const fetchMovies = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/person/popular", {
    params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
  });
  return response.data.results;
};