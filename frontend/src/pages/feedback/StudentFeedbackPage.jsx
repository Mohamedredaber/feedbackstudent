import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentFeedbacks, selectStudentFeedbacks, selectFeedbackLoading } from '../../features/feedback/feedbackSlice';
import { Star, MessageSquare } from 'lucide-react';

const StarDisplay = ({ note }) => (
    <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
            <Star key={i} size={14} className={i <= note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
        ))}
    </div>
);

export default function StudentFeedbackPage() {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectStudentFeedbacks);
    const loading = useSelector(selectFeedbackLoading);

    useEffect(() => { dispatch(fetchStudentFeedbacks()); }, [dispatch]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MessageSquare size={22} className="text-blue-600" />
                    </div>
                    Mes Feedbacks
                </h1>
                <p className="text-gray-500 mt-1 ml-[52px]">{feedbacks.length} feedback(s) soumis</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : feedbacks.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Vous n'avez pas encore soumis de feedback</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {feedbacks.map(f => (
                        <div key={f._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-800">{f.coursTitle}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(f.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <StarDisplay note={f.note} />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{f.commentaire}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}