import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/next.svg"
        alt="Pelicula Insight"
        width={400}
        height={400}
      />
      <h1 className="text-4xl font-bold text-center">
        Estas en el apartado de categorias
      </h1>
      <p className="text-lg text-center">
        Tu catalogo de informacion de peliculas
      </p>
    </main>
  );
}
