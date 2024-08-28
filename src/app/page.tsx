import Image from "next/image";
import Carrousel from "../ui/Carrousel";

export default function Home() {
  return (
    
    <main className="container mx-auto flex min-h-screen flex-col items-center">

      <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

      <section>
        <div className="bg-gray-100 sm:grid grid-cols-5 grid-rows-1 px-4 py-6 min-h-full space-y-6 sm:space-y-0 sm:gap-4">

          <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 rounded-md flex items-center">
            
            <div className="ml-20 w-80">
              <h2 className="text-white text-4xl">Últimos lanzamientos</h2>
              <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">Nombre Pelicula</p>

              <a href="#" className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100">Saber mas</a>
            </div>

          </div>
          <div className="h-96 col-span-1 ">
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <input type="text" placeholder="seach" className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"/>
                <span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor ">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg></span>
            </div>
            <div className="bg-white  rounded-md">

              <h1 className="text-center text-xl my-4  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">Categorias</h1>
              <div className="bg-white rounded-md list-none  text-center ">
                <li className="py-3 border-b-2"><a href="#" className="list-none  hover:text-indigo-600">Products</a></li>
                <li className="py-3 border-b-2"><a href="#" className="list-none  hover:text-indigo-600">Models</a></li>
                <li className="py-3 border-b-2"><a href="#" className="list-none  hover:text-indigo-600">Pricing</a></li>
                <li className="py-3 border-b-2"><a href="#" className="list-none  hover:text-indigo-600">Hire</a></li>
                <li className="py-3 "><a href="#" className="list-none border-b-2 hover:text-indigo-600">Business</a></li>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 w-full py-6">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-semibold">Peliculas</h2>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-md p-4">
              <Image src="https://picsum.photos/seed/picsum/400/600" alt="pelicula" layout="responsive" width={200} height={300} />
              <h2 className="text-center text-lg font-semibold">Pelicula 1</h2>
            </div>
            <div className="bg-white rounded-md p-4">
              <Image src="https://picsum.photos/seed/paco/400/600" alt="pelicula" layout="responsive" width={200} height={300} />
              <h2 className="text-center text-lg font-semibold">Pelicula 2</h2>
            </div>
            <div className="bg-white rounded-md p-4">
              <Image src="https://picsum.photos/seed/hola/400/600" alt="pelicula" layout="responsive" width={200} height={300} />
              <h2 className="text-center text-lg font-semibold">Pelicula 3</h2>
            </div>
            <div className="bg-white rounded-md p-4">
              <Image src="https://picsum.photos/seed/manolito/400/600" alt="pelicula" layout="responsive" width={200} height={300} />
              <h2 className="text-center text-lg font-semibold">Pelicula 4</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
