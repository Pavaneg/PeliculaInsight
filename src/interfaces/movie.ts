import { Genre } from "./genre";
import { Videos } from "./videos";
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_language: string;
  origin_country: string[];
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  videos: Videos;
  vote_average: number;
  vote_count: number;
  status: string;
  rating?: number;
}