import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2, MessageSquare, Star, X } from 'lucide-react';
import { getColor } from '../../../utils/coursUtils';
import { addFeedback } from '../../../features/feedback/feedbackSlice';
import { useNavigate } from 'react-router-dom';
export default function CoursCard({ c, isAdmin, isStudent, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const color = getColor(c.category);
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false); 
  const [note, setNote] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const voirdetails = (val)=>{
    navigate(`/cours/details/${val}`)

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note === 0) return setError('Veuillez sélectionner une note');
    setError('');
    setLoading(true);

    const result = await dispatch(addFeedback({
      coursId: c._id,       
      data: { note, commentaire }
    }));

    setLoading(false);

    if (addFeedback.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => {
        setOpened(false);
        setSuccess(false);
        setNote(0);
        setCommentaire('');
      }, 1500);
    } else {
      setError(result.payload || 'Erreur lors de l\'envoi');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group">

      <div className={`h-1.5 ${color.dot}`} />

      <div className="p-5 flex flex-col flex-1">

        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color.bg} ${color.text}`}>
            {c.category}
          </span>
          {isAdmin && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(c)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Pencil size={14} />
              </button>
              <button onClick={() => onDelete(c._id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        <h3 className="font-bold text-gray-800 mb-1">{c.title}</h3>
        <p className="text-sm text-gray-500 flex-1 line-clamp-2">{c.description}</p>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
          <span className="text-sm text-gray-600">{c.instructor}</span>
          <button
            onClick={()=>voirdetails(c._id)}
          >
            details
          </button>
          {isStudent && (
            <button
              onClick={() => setOpened(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 px-3 py-1.5 rounded-lg transition">
              <MessageSquare size={13} />
              {opened ? 'Fermer' : 'Feedback'}
            </button>

          )}

        </div>


        {opened && (
          <div className="mt-4 pt-4 border-t border-gray-100">

            {success ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium text-sm">✅ Feedback envoyé !</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                {/* Étoiles */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1.5">Note</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button"
                        onClick={() => setNote(n)}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition-transform hover:scale-110">
                        <Star size={22}
                          className={n <= (hovered || note)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200 fill-gray-200'}
                        />
                      </button>
                    ))}
                    {note > 0 && (
                      <span className="text-xs text-gray-400 ml-1 self-center">
                        {['', 'Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Excellent'][note]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Commentaire */}
                <textarea
                  value={commentaire}
                  onChange={e => setCommentaire(e.target.value)}
                  placeholder="Votre commentaire..."
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                />

                {/* Boutons */}
                <div className="flex gap-2">
                  <button type="button"
                    onClick={() => { setOpened(false); setNote(0); setCommentaire(''); setError(''); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                    <X size={13} /> Annuler
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-medium transition disabled:opacity-60 flex items-center justify-center gap-1">
                    {loading
                      ? <><span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi...</>
                      : <><MessageSquare size={13} /> Envoyer</>
                    }
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}