import { Movie } from '@/interfaces/movie';
import Image from 'next/image';
import { fetchMovie } from '@/api/movieSearchIdService';

interface MovieDetailProps {
  params: {
    id: string;
  };
}

const MovieDetail = async ({ params }: MovieDetailProps) => {
  const { id } = params;

  const movie: Movie = await fetchMovie(id);

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/peliculaStock.jpg"; // Ruta a la imagen predeterminada en la carpeta public

    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <Image
              src={posterPath}
              alt={movie.title}
              width={500}
              height={750}
              className="rounded-md"
              priority={true}
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-4">{movie.overview}</p>
            <p className="mt-4"><strong>Release Date:</strong> {movie.release_date}</p>
            <p className="mt-4"><strong>Rating:</strong> {movie.vote_average}</p>
            <p className="mt-4"><strong>Vote Count:</strong> {movie.vote_count}</p>
            <p className="mt-4"><strong>Original Title:</strong> {movie.original_title}</p>
            <p className="mt-4"><strong>Original Language:</strong> {movie.original_language}</p>
            <p className="mt-4"><strong>Popularity:</strong> {movie.popularity}</p>
            <p className="mt-4"><strong>Adult:</strong> {movie.adult ? 'Yes' : 'No'}</p>
            <p className="mt-4"><strong>Video:</strong> {movie.video ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    );
  };

export default MovieDetail;