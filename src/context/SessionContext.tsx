"use client";

import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { GuestSessionResponse } from '@/interfaces/guestSessionResponse';

interface SessionState {
    guestSession: GuestSessionResponse | null;
    error: string;
}

type SessionAction =
    | { type: 'CREATE_SESSION'; payload: GuestSessionResponse }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CANCEL_SESSION' };

const initialState: SessionState = {
    guestSession: null,
    error: '',
};

const SessionContext = createContext<{
    state: SessionState;
    dispatch: Dispatch<SessionAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

const sessionReducer = (state: SessionState, action: SessionAction): SessionState => {
    switch (action.type) {
        case 'CREATE_SESSION':
            return { ...state, guestSession: action.payload, error: '' };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'CANCEL_SESSION':
            return { ...state, guestSession: null, error: '' };
        default:
            return state;
    }
};

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(sessionReducer, initialState);

    return (
        <SessionContext.Provider value={{ state, dispatch }}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };