import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/interfaces/movie"; // Importar la interfaz

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/peliculaStock.jpg"; // Imagen por defecto pelicula sin caratula

  const releaseDate = new Date(movie.release_date).toLocaleDateString('es-ES'); // Formatear fecha

  return (
    <Link href={`/movies/${movie.id}`}>
      <div key={movie.id} className="bg-white rounded-md shadow-md my-3">
        <div className="max-h-96 overflow-hidden">
          <Image
            src={posterPath}
            alt={movie.title}
            width={500}
            height={400}
            className="rounded-t-md object-cover w-full h-full"
            priority={true}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center line-clamp-1">{movie.title}</h3>
          <p className="text-sm mt-2 text-center">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;