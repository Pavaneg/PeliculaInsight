"use client"

import { fetchMovies } from '@/api/movieSearchService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MovieCard from '../ui/MovieCard';
import { Movie } from "@/interfaces/movie";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [search, setSearch] = useState(query);
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const data = await fetchMovies(query);
          setResults(data);
          setError(null);
        } catch (err) {
          setError('Error al buscar películas. Por favor, inténtalo de nuevo.');
        }
      };
      fetchData();
    }
  }, [query]);

  const handleSearch = () => {
    if (search.trim() === '') {
      setError('El campo de búsqueda no puede estar vacío.');
      return;
    }
    router.push(`/search?query=${search}`);
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <section>
        <div className="flex justify-center mt-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Realizar otra búsqueda"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Campo de búsqueda"
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            aria-label="Botón de búsqueda"
          >
            Buscar
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </section>

      <section className="w-full py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-semibold">Peliculas</h2>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;