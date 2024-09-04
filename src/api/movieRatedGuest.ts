import axios from 'axios';

async function getRatedMovies(guestSessionId: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest_session/${guestSessionId}/rated/movies`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
            },
        });
        const movies = response.data.results;
        return movies;
    } catch (error) {
        console.error('Error retrieving rated movies:', error);
    }
}

export { getRatedMovies };