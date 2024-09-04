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
        <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Valorar Película</h2>
            <div className="flex items-center mb-4">
                <label htmlFor="rating" className="font-bold mr-2">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="0"
                    max="10"
                    required
                    className="border rounded p-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit Rating
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
    );
};

export default RatingForm;