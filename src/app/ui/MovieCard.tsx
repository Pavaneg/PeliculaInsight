import Image from "next/image";
import { Movie } from "@/interfaces/movie"; // Importar la interfaz

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/peliculaStock.jpg"; // Ruta a la imagen predeterminada en la carpeta public
    
  return (
    <div key={movie.id} className="bg-white rounded-md shadow-md">
      <Image
        src={posterPath}
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-t-md"
        priority={true}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm mt-2">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;