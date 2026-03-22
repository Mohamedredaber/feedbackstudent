import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addFeedback } from '../store/thunks/feedbackThunks';
import { selectFeedbackLoading, selectFeedbackError } from '../store/slices/feedbackSlice';

export default function AddFeedback() {
    const { coursTitle } = useParams();
    const [note, setNote] = useState(5);
    const [commentaire, setCommentaire] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectFeedbackLoading);
    const error = useSelector(selectFeedbackError);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(addFeedback({
            coursTitle,
            data: { note: Number(note), commentaire }
        }));

        if (addFeedback.fulfilled.match(resultAction)) {
            navigate(`/cours/${encodeURIComponent(coursTitle)}`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Review: {coursTitle}</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">Rating (1-5)</label>
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map(num => (
                            <button
                                key={num}
                                type="button"
                                className={`text-3xl ${note >= num ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
                                onClick={() => setNote(num)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">Comment</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32"
                        value={commentaire}
                        onChange={e => setCommentaire(e.target.value)}
                        placeholder="Share your experience with this course..."
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 font-medium shadow-sm"
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </form>
        </div>
    );
}
