"use client";

import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { fetchMovie } from '@/api/movieSearchIdService';
import { createGuestSession } from '@/api/createGuestSession';
import { Movie } from '@/interfaces/movie';
import { SessionContext } from '@/context/SessionContext';
import RatingForm from '@/app/ui/RatingForm';

interface MovieDetailProps {
  params: {
    id: string;
  };
}

const MovieDetail = ({ params }: MovieDetailProps) => {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<any | null>(null);
  const { state, dispatch } = useContext(SessionContext);

  useEffect(() => {
    const fetchData = async () => {
      const movieData: Movie | null = await fetchMovie(id);
      if (movieData) {
        setMovie(movieData);
        if (movieData.videos && movieData.videos.results.length > 0) {
          setTrailer(movieData.videos.results[0]);
        }
      }
    };

    const fetchSession = async () => {
      try {
        const session = await createGuestSession();
        
      } catch (error) {
        
      }
    };

    fetchData();

    if (!state.guestSession) {
      fetchSession();
    }
  }, [id, state.guestSession, dispatch]);

  const guestSession = state.guestSession;

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            {movie && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="md:w-2/3 md:ml-8">
            {movie && (
              <>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.title}</h1>
                <p className="text-gray-600 mb-4">{movie.overview}</p>
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
              </>
            )}
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Trailer</h2>
              {trailer && (
                <div className="mt-4">
                  <YouTube videoId={trailer.key} className="rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
            {guestSession && movie && (
              <div className="mt-8">
                <RatingForm movieId={movie.id} sessionId={guestSession.guest_session_id} />
              </div>
            )}
          </div>
      </div>
  );
};

export default MovieDetail;