import axios from 'axios';

export const submitReview = async (movieId: number, sessionId: string, rating: number) => {

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}/rating`,
        {
            value: rating,
        },
        {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                guest_session_id: sessionId,
            },
        }
    );

    return response.data;
};