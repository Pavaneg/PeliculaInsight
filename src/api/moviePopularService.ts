import { Movie } from "@/interfaces/movie";
import axios from "axios";

export const fetchMovies = async () => {
  let movies: Movie[] = [];
  let page = 1;

  while (movies.length < 20) {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/movie/popular?language=es", {
      params: { api_key: process.env.NEXT_PUBLIC_API_KEY, page },
    });

    const filteredMovies = response.data.results.filter((movie: Movie) => movie.overview);

    filteredMovies.forEach((movie: Movie) => {
      if (!movies.some(m => m.id === movie.id)) {
        movies.push(movie);
      }
    });

    if (filteredMovies.length < response.data.results.length) {
      page++;
    } else {
      break;
    }
  }
  return movies.slice(0, 20);
};