import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopCourses } from '../store/thunks/feedbackThunks';
import { selectTopCourses, selectFeedbackLoading, selectFeedbackError } from '../store/slices/feedbackSlice';
import { Link } from 'react-router-dom';

export default function TopCourses() {
    const dispatch = useDispatch();
    const topCourses = useSelector(selectTopCourses);
    const loading = useSelector(selectFeedbackLoading);
    const error = useSelector(selectFeedbackError);

    useEffect(() => {
        dispatch(fetchTopCourses());
    }, [dispatch]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">Wall of Excellence</h1>
                <p className="text-gray-600 text-lg">Perfect 5-Star Reviews</p>
            </div>

            {loading && <div className="text-center py-10 text-gray-600">Loading top reviews...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topCourses?.map((fb) => (
                    <div key={fb._id} className="bg-gradient-to-b from-white to-yellow-50 p-6 rounded-xl shadow border border-yellow-200 transform transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex justify-center -mt-10 mb-4">
                            <div className="bg-yellow-400 text-white rounded-full h-12 w-12 flex items-center justify-center text-2xl shadow-md border-2 border-white">
                                ★
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <Link to={`/cours/${encodeURIComponent(fb.coursTitle)}`} className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition">
                                {fb.coursTitle}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">Reviewed by {fb.studentEmail}</div>
                        </div>
                        <p className="text-gray-700 text-center italic leading-relaxed">"{fb.commentaire}"</p>
                    </div>
                ))}
                {!loading && topCourses?.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        No 5-star reviews found yet.
                    </div>
                )}
            </div>
        </div>
    );
}
