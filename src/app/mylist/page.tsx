"use client";

import React, { useState, useEffect, useCallback, useContext, Suspense } from 'react';
import { Movie } from '@/interfaces/movie';
import { SessionContext } from '@/context/SessionContext';
import { getRatedMovies } from '@/api/movieRatedGuest';

const MovieCardRated = React.lazy(() => import('@/app/ui/MovieCardRated'));

const MyList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { state } = useContext(SessionContext);

    const getMovies = useCallback(async () => {
        if (state.guestSession?.guest_session_id) {
            const moviesData = await getRatedMovies(state.guestSession.guest_session_id);
            setMovies(moviesData || []);
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
                        {Array.isArray(movies) && movies.length > 0 ? (
                            <div className="grid grid-cols-4 gap-4 mt-6">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {movies.map((movie) => (
                                        <MovieCardRated key={movie.id} movie={movie} />
                                    ))}
                                </Suspense>
                            </div>
                        ) : (
                            <div className="mt-6 p-4 border border-gray-300 bg-zinc-200 rounded-lg shadow-md">
                                <h2 className="text-center text-xl text-gray-500">No se encuentran películas valoradas por el usuario.</h2>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <section className="w-full py-6 px-4">
                    <div className="container mx-auto">
                        <div className="p-4 border border-gray-300 bg-zinc-200 rounded-lg shadow-md">
                            <h2 className="text-center text-3xl font-semibold text-black">Necesitas abrir una sesión para poder valorar películas</h2>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default MyList;