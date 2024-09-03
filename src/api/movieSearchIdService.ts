import axios from 'axios';

export const fetchMovie = async (id: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}?language=es&append_to_response=videos`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  return response.data;

};