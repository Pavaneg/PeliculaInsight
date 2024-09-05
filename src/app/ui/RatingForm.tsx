import { useState } from 'react';
import { submitReview } from '@/api/submitReview';

interface RatingFormProps {
    movieId: number;
    sessionId: string;
}

const RatingForm: React.FC<RatingFormProps> = ({ movieId, sessionId }) => {
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submitReview(movieId, sessionId, rating);
            setSuccess('Rating submitted successfully!');
            setRating(0);
        } catch (err) {
            setError('Failed to submit rating');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 mx-auto p-4 bg-zinc-200 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Valorar Película</h2>
            <div className="flex flex-col mb-6">
                <label htmlFor="rating" className="font-bold mb-2">Nota:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="0"
                    max="10"
                    required
                    placeholder="Ingrese un rating de 0 a 10"
                    className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Enviar Nota
            </button>
            {error && <p className="text-red-500 mt-4">No se pudo enviar la nota</p>}
            {success && <p className="text-green-500 mt-4">Nota enviada correctamente</p>}
        </form>
    );
};

export default RatingForm;