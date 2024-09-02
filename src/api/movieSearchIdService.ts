// src/api/movieSearchIdService.ts
import axios from 'axios';

export const fetchMovie = async (id: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  return response.data;

};