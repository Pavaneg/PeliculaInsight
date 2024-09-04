"use client";

import React, { useState, useEffect, useCallback, useContext } from 'react';
import MovieCardRated from '@/app/ui/MovieCardRated';
import { Movie } from '@/interfaces/movie';
import { SessionContext } from '@/context/SessionContext'; // Asegúrate de que la ruta sea correcta
import { getRatedMovies } from '@/api/movieRatedGuest'; // Asegúrate de que la ruta sea correcta

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { state } = useContext(SessionContext);

    const getMovies = useCallback(async () => {
        if (state.guestSession?.guest_session_id) {
            const moviesData = await getRatedMovies(state.guestSession.guest_session_id);
            setMovies(moviesData);
        }
    }, [state.guestSession?.guest_session_id]);

    useEffect(() => {
        if (state.guestSession?.guest_session_id) {
            getMovies();
        }
    }, [getMovies, state.guestSession?.guest_session_id]);

    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center">
            {state.guestSession ? (
                <section className="w-full py-6 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-center text-3xl font-semibold">Peliculas valoradas por ti</h2>
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {movies.map((movie) => (
                                <MovieCardRated key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="w-full py-6 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-center text-3xl font-semibold">Necesitas abrir una sesión para poder valorar películas</h2>
                    </div>
                </section>
            )}
        </main>
    );
};

export default Home;