import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCoursByTitle } from '../store/thunks/coursThunks';
import { fetchFeedbackByCours } from '../store/thunks/feedbackThunks';
import { selectSelectedCours, selectCoursLoading } from '../store/slices/coursSlice';
import { selectAllFeedbacks } from '../store/slices/feedbackSlice';
import { selectRole } from '../store/slices/authSlice';

export default function CoursDetail() {
    const { title } = useParams();
    const dispatch = useDispatch();

    const course = useSelector(selectSelectedCours);
    const feedbacks = useSelector(selectAllFeedbacks);
    const loading = useSelector(selectCoursLoading);
    const role = useSelector(selectRole);

    useEffect(() => {
        if (title) {
            dispatch(fetchCoursByTitle(title));
            dispatch(fetchFeedbackByCours(title));
        }
    }, [dispatch, title]);

    if (loading || !course) return <div className="text-center py-10 text-gray-600">Loading course details...</div>;

    const avgNote = feedbacks?.length
        ? (feedbacks.reduce((acc, curr) => acc + curr.note, 0) / feedbacks.length).toFixed(1)
        : 'No ratings yet';

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {course.category}
                    </span>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{course.description}</p>
                <div className="flex border-t border-gray-100 pt-6 mt-2 text-sm text-gray-600 gap-8 bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-lg">
                    <div><span className="font-semibold text-gray-800 uppercase tracking-wider text-xs block mb-1">Instructor</span> {course.instructor}</div>
                    <div><span className="font-semibold text-gray-800 uppercase tracking-wider text-xs block mb-1">Validation</span> {avgNote} {avgNote !== 'No ratings yet' && '/ 5'}</div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Student Feedback</h2>
                {role === 'student' && (
                    <Link
                        to={`/feedback/add/${encodeURIComponent(course.title)}`}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 font-medium shadow-sm transition"
                    >
                        Leave Feedback
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {feedbacks?.length === 0 ? (
                    <p className="text-gray-500 bg-white p-8 rounded-lg border border-dashed border-gray-300 text-center">No feedback has been submitted for this course yet.</p>
                ) : (
                    feedbacks?.map(fb => (
                        <div key={fb._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-800 text-sm bg-gray-100 px-2 py-1 rounded">{fb.studentEmail}</span>
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                                    <span className="text-yellow-400 font-bold mr-1 leading-none">★</span>
                                    <span className="font-bold text-yellow-700 text-sm leading-none">{fb.note}/5</span>
                                </div>
                            </div>
                            <p className="text-gray-700 italic border-l-4 border-indigo-200 pl-4 py-1 my-3 bg-indigo-50/30">"{fb.commentaire}"</p>
                            <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400 font-mono">
                                {new Date(fb.createdAt).toLocaleDateString()} at {new Date(fb.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
