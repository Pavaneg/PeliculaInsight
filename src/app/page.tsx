'use client'

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "@/api/moviePopularService";
import { fetchGenre } from "@/api/genreMovieService";
import { Movie } from "@/interfaces/movie";
import { Genre } from "@/interfaces/genre";
import MovieCard from "@/app/ui/MovieCard";
import { useRouter } from 'next/navigation';




const Home = () => {

  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomGenres, setRandomGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");

  const getMovies = useCallback(async () => {
    const moviesData = await fetchMovies();
    setMovies(moviesData);
  }, []);

  const getGenre = useCallback(async () => {
    const genreData = await fetchGenre();
    selectRandomGenres(genreData);
  }, []);

  const selectRandomGenres = (genres: any[]) => {
    const shuffled = genres.toSorted(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setRandomGenres(selected);
  };

  useEffect(() => {
    getMovies();
    getGenre();
  }, [getMovies, getGenre]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };



  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

      <section>
        <div className="sm:grid grid-cols-5 grid-rows-1 px-4 py-6 min-h-full space-y-6 sm:space-y-0 sm:gap-4">
          <div className="h-96 col-span-4 bg-gradient-to-tr from-customInsight-800 to-customInsight-500 rounded-md flex items-center">
            <div className="mx-20">
              <h2 className="text-white text-4xl">Descubre el Universo del Cine</h2>
              <p className="text-indigo-100 mt-4 font-thin tracking-wider leading-7">Bienvenido a Películas Insight, tu portal para explorar, descubrir y sumergirte en el mundo de las películas. Encuentra información detallada, reseñas y mucho más, todo en un solo lugar.</p>
              <a href="#" className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100">Saber mas</a>
            </div>
          </div>
          <div className="h-96 col-span-1">
            <form onSubmit={handleSearch} className="bg-white py-3 px-4 rounded-lg flex justify-around items-center">
              <input
                type="text"
                placeholder="search"
                className="bg-gray-100 rounded-md outline-none pl-2 ring-customInsight-700 w-full mr-2 p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="p-0 border-none bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <div className="bg-white rounded-md">
              <h1 className="text-center text-xl mt-4 bg-white py-2 rounded-md border-b-2 cursor-pointer text-gray-600">Categorias</h1>
              <ul className="bg-white rounded-md list-none text-center">
                {randomGenres.map((genre) => (
                  <li key={genre.id} className="py-3 border-b-2">
                    <a href="#" className="hover:text-customInsight-600">{genre.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-semibold">Peliculas</h2>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;