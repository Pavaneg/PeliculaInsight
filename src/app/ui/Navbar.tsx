"use client";

import { useState, useContext } from 'react';
import Link from 'next/link';
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { createGuestSession } from '@/api/createGuestSession';
import { SessionContext } from '@/context/SessionContext';
import { AxiosError } from 'axios';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { state, dispatch } = useContext(SessionContext);

    const handleCreateSession = async () => {
        try {
            const session = await createGuestSession();
            dispatch({ type: 'CREATE_SESSION', payload: session });
        } catch (err) {
            const axiosError = err as AxiosError<{ status_message: string }>;
            const errorMessage = axiosError.response?.data?.status_message || axiosError.message;
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
        }
    };

    const handleCancelSession = () => {
        dispatch({ type: 'CANCEL_SESSION' });
    };

    return (
        <>
            <header className="bg-color-nav shadow-md">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                            <img alt="PeliculaInsight Logo" src="/logo.png" className="h-10 w-auto" />
                            <span className="ml-3 text-xl font-bold text-white">Peliculas Insight</span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Abrir menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Link href="/" className="text-sm font-semibold leading-6 text-white">
                            Inicio
                        </Link>
                        <Link href="/search" className="text-sm font-semibold leading-6 text-white">
                            Buscar
                        </Link>
                        {state.guestSession && (
                            <Link href="/mylist" className="text-sm font-semibold leading-6 text-white">
                                Mis valoraciones
                            </Link>
                        )}
                    </PopoverGroup>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end text-white">
                        <button
                            onClick={handleCreateSession}
                            className="rounded-lg bg-cyan-600 py-2 px-4 text-base font-semibold leading-7 text-white hover:bg-cyan-700"
                        >
                            Create Guest Session
                        </button>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-color-nav px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                <img alt="PeliculaInsight Logo" src="./logo.png" className="h-10 w-auto" />
                                <span className="ml-3 text-xl font-bold text-white">PeliculaInsight</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="sr-only">Cerrar menú</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-200/10">
                                <div className="space-y-2 py-6">
                                    <Link
                                        href="/"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700 hover:text-white"
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        href="/search"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700 hover:text-white"
                                    >
                                        Buscar
                                    </Link>
                                    {state.guestSession && (
                                        <Link
                                            href="/mylist"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700 hover:text-white"
                                        >
                                            Mis valoraciones
                                        </Link>
                                    )}
                                </div>
                                <div className="py-6">
                                    <button
                                        onClick={handleCreateSession}
                                        className="w-full rounded-lg bg-cyan-600 py-2 px-4 text-base font-semibold leading-7 text-white hover:bg-cyan-700"
                                    >
                                        Crear sesión de invitado
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
            {state.guestSession && (
                <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
                    <div className="flex justify-between items-center">
                        <div>
                            <p>ID Sesion Invitado: {state.guestSession.guest_session_id}</p>
                            <p>Finaliza: {state.guestSession.expires_at}</p>
                        </div>
                        <button onClick={handleCancelSession} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancelar Sesión
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}