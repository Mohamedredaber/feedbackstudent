import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopCourses, selectTopCourses, selectFeedbackLoading } from '../../features/feedback/feedbackSlice';
import { Star, BookOpen, User } from 'lucide-react';

export default function TopCoursesPage() {
  const dispatch = useDispatch();
  const topCourses = useSelector(selectTopCourses);        // ✅ sans ()
  const loading = useSelector(selectFeedbackLoading);

  useEffect(() => {                                         // ✅ fonction arrow
    dispatch(fetchTopCourses());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Star size={22} className="text-yellow-500 fill-yellow-500" />
          </div>
          Top Cours
        </h1>
        <p className="text-gray-500 mt-1 ml-[52px]">
          Cours ayant reçu une note de 5 étoiles
        </p>
      </div>

      {/* Contenu */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : topCourses.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Star size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">Aucun top cours pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topCourses.map((f) => (    // ✅ f = feedback (coursTitle, note, commentaire...)
            <div key={f._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">

              {/* Étoiles */}
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16}
                    className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Titre cours */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={15} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800">{f.coursTitle}</h3>
              </div>

              {/* Commentaire */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                "{f.commentaire}"
              </p>

              {/* Étudiant + date */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User size={12} className="text-indigo-600" />
                  </div>
                  <span className="text-xs text-gray-500">{f.studentEmail}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(f.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}