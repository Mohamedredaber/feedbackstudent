import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentFeedbacks } from '../store/thunks/feedbackThunks';
import { selectStudentFeedbacks, selectFeedbackLoading, selectFeedbackError } from '../store/slices/feedbackSlice';
import { Link } from 'react-router-dom';

export default function StudentFeedback() {
    const dispatch = useDispatch();
    const studentFeedbacks = useSelector(selectStudentFeedbacks);
    const loading = useSelector(selectFeedbackLoading);
    const error = useSelector(selectFeedbackError);

    useEffect(() => {
        dispatch(fetchStudentFeedbacks());
    }, [dispatch]);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Feedback</h1>

            {loading && <div className="text-center py-10 text-gray-600">Loading your feedback...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <div className="space-y-4">
                {studentFeedbacks?.map((fb) => (
                    <div key={fb._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4 flex flex-col justify-center">
                            <Link to={`/cours/${encodeURIComponent(fb.coursTitle)}`} className="font-bold text-indigo-600 hover:text-indigo-800 mb-2 truncate">
                                {fb.coursTitle}
                            </Link>
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-1 text-lg">★</span>
                                <span className="font-bold text-gray-700">{fb.note}/5</span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-gray-700 italic border-l-4 border-gray-200 pl-4 py-1">"{fb.commentaire}"</p>
                            <div className="mt-4 text-xs text-gray-400">
                                Posted on {new Date(fb.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && studentFeedbacks?.length === 0 && (
                    <div className="text-center text-gray-500 py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                        You haven't reviewed any courses yet.
                    </div>
                )}
            </div>
        </div>
    );
}
