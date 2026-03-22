import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeedbacks, deleteFeedback } from '../store/thunks/feedbackThunks';
import { selectAllFeedbacks, selectFeedbackLoading, selectFeedbackError } from '../store/slices/feedbackSlice';
import { selectRole } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';

export default function FeedbackList() {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectAllFeedbacks);
    const loading = useSelector(selectFeedbackLoading);
    const error = useSelector(selectFeedbackError);
    const role = useSelector(selectRole);

    useEffect(() => {
        dispatch(fetchAllFeedbacks());
    }, [dispatch]);

    const handleDelete = (coursTitle) => {
        if (window.confirm(`Delete feedback for course ${coursTitle}?`)) {
            dispatch(deleteFeedback(coursTitle));
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Feedback</h1>

            {loading && <div className="text-center py-10 text-gray-600">Loading feedbacks...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks?.map((fb) => (
                    <div key={fb._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <Link to={`/cours/${encodeURIComponent(fb.coursTitle)}`} className="font-bold text-indigo-600 hover:text-indigo-800">
                                {fb.coursTitle}
                            </Link>
                            <div className="flex items-center bg-yellow-50 px-2 rounded">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="font-bold text-yellow-700">{fb.note}/5</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 h-16 overflow-hidden">"{fb.commentaire}"</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>By: {fb.studentEmail}</span>
                            {role === 'admin' && (
                                <button onClick={() => handleDelete(fb.coursTitle)} className="text-red-500 hover:text-red-700 font-medium cursor-pointer">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {!loading && feedbacks?.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
                        No feedback found.
                    </div>
                )}
            </div>
        </div>
    );
}
