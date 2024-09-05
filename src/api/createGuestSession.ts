import axios from 'axios';

export const createGuestSession = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/authentication/guest_session/new', {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return response.data;
};