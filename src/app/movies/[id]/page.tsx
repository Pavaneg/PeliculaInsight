"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { fetchMovie } from '@/api/movieSearchIdService';
import { Movie } from '@/interfaces/movie';
import { Video } from '@/interfaces/video';
interface MovieDetailProps {
  params: {
    id: string;
  };
}

const MovieDetail = ({ params }: MovieDetailProps) => {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieData: Movie | null = await fetchMovie(id);
      if (movieData) {
        setMovie(movieData);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/peliculaStock.jpg"; // Ruta a la imagen stock para películas sin imagen

  // Filtrar el primer tráiler
  const trailer = movie.videos.results.find((video: Video) => video.type === 'Trailer');

  // Formatear la fecha en formato europeo
  const releaseDate = new Date(movie.release_date).toLocaleDateString('es-ES');

  // Mostrar la puntuación con estrellas
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
  <div className="flex flex-col md:flex-row gap-6">
    <div className="md:w-1/3">
      <Image
        src={posterPath}
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-lg shadow-md"
        priority={true}
      />
    </div>
    <div className="md:w-2/3">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{movie.title}</h1>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">{movie.overview}</p>
      
      <div className="grid grid-cols-2 gap-4 text-gray-800 text-lg">
        <div className="flex items-center">
          <span className="font-bold">Fecha de lanzamiento:</span> 
          <span className="ml-2">{releaseDate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Calificación:</span> 
          <span className="ml-2">{renderStars(movie.vote_average)}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Conteo de votos:</span> 
          <span className="ml-2">{movie.vote_count}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Título original:</span> 
          <span className="ml-2">{movie.original_title}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Idioma original:</span> 
          <span className="ml-2">{movie.original_language}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Popularidad:</span> 
          <span className="ml-2">{movie.popularity}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Para adultos:</span> 
          <span className="ml-2">{movie.adult ? 'Sí' : 'No'}</span>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Trailer</h2>
        {trailer && (
          <div className="mt-4">
            <YouTube videoId={trailer.key} className="rounded-lg"/>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default MovieDetail;