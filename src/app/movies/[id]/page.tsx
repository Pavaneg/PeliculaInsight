"use client";

import React, { useEffect, useState, useContext, Suspense } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { fetchMovie } from '@/api/movieSearchIdService';
import { createGuestSession } from '@/api/createGuestSession';
import { Movie } from '@/interfaces/movie';
import { SessionContext } from '@/context/SessionContext';
import { StarIcon } from '@heroicons/react/24/outline';

const RatingForm = React.lazy(() => import('@/app/ui/RatingForm'));

interface MovieDetailProps {
  params: {
    id: string;
  };
}

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <StarIcon
        key={i}
        className={`h-6 w-6 ${i <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

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

  if (!movie) return <div>Loading...</div>;

  return (
    <main className="container min-h-screen mx-auto flex flex-col items-center">
      <section className="my-10">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:w-1/3 flex flex-row flex-wrap justify-center md:justify-start">
            {movie && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg max-w-full h-auto"
                style={{ maxWidth: '100%', maxHeight: '750px' }}
              />
            )}
            <div className="mt-8 w-full h-fit flex justify-center">
              {guestSession && movie && (
                <Suspense fallback={<div>Loading Rating Form...</div>}>
                  <RatingForm movieId={movie.id} sessionId={guestSession.guest_session_id} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="md:w-2/3 md:ml-8 bg-zinc-200 rounded-md p-10 overflow-hidden">
            {movie && (
              <>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.title}</h1>
                <div className="italic text-gray-600 mb-4">
                  {movie.genres.map((genre) => genre.name).join(', ')}
                </div>
                <p className="text-gray-600 mb-4">{movie.overview}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Título original:</span>
                      <span className="ml-2 text-gray-300">{movie.original_title}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">País de origen:</span>
                      <span className="ml-2 text-gray-300">{movie.origin_country}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Idioma original:</span>
                      <span className="ml-2 text-gray-300">{movie.original_language}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Fecha de lanzamiento:</span>
                      <span className="ml-2 text-gray-300">{formatDate(movie.release_date)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Estado:</span>
                      <span className="ml-2 text-gray-300">{movie.status}</span>
                    </div>
                  </div>
                </div>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Popularidad:</span>
                      <span className="ml-2 text-gray-300">{movie.popularity}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <span className="font-bold text-white">Votos:</span>
                      <span className="ml-2 text-gray-300">{movie.vote_count}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                    <span className="font-bold text-white text-lg">Nota:</span>
                    <div className="ml-4">
                      <RatingStars rating={Math.round(movie.vote_average)} />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mt-8">
              {trailer && (
                <div className="mt-4 youtube-container">
                  <YouTube videoId={trailer.key} className="youtube-video" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetail;