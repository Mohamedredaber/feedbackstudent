import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeedbacks, updateFeedback, deleteFeedback, selectFeedbacks, selectFeedbackLoading } from '../../features/feedback/feedbackSlice';
import { MessageSquare, Trash2, Pencil, Star, X, Search } from 'lucide-react';

const StarDisplay = ({ note }) => (
    <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
            <Star key={i} size={14} className={i <= note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
        ))}
    </div>
);

export default function FeedbackPage() {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectFeedbacks);
    const loading = useSelector(selectFeedbackLoading);

    const [search, setSearch] = useState('');
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [form, setForm] = useState({ note: 1, commentaire: '' });
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => { dispatch(fetchAllFeedbacks()); }, [dispatch]);

    const filtered = feedbacks.filter(f =>
        f.coursTitle?.toLowerCase().includes(search.toLowerCase()) ||
        f.studentEmail?.toLowerCase().includes(search.toLowerCase())
    );

    const openEdit = (f) => {
        setEditTarget(f);
        setForm({ note: f.note, commentaire: f.commentaire });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        await dispatch(updateFeedback({ id: editTarget._id, data: form }));
        setFormLoading(false);
        setEditTarget(null);
    };

    const handleDelete = async () => {
        await dispatch(deleteFeedback(deleteTarget));
        setDeleteTarget(null);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <MessageSquare size={22} className="text-indigo-600" />
                        </div>
                        Tous les Feedbacks
                    </h1>
                    <p className="text-gray-500 mt-1 ml-[52px]">{filtered.length} feedbacks au total</p>
                </div>
            </div>

            {/* Recherche */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="relative max-w-md">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Rechercher par cours ou étudiant..."
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    />
                </div>
            </div>

            {/* Liste */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Aucun feedback trouvé</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['Cours', 'Étudiant', 'Note', 'Commentaire', 'Date', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(f => (
                                <tr key={f._id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-4">
                                        <span className="font-medium text-gray-800 text-sm">{f.coursTitle}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm text-gray-600">{f.studentEmail}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <StarDisplay note={f.note} />
                                    </td>
                                    <td className="px-5 py-4 max-w-xs">
                                        <p className="text-sm text-gray-600 truncate">{f.commentaire}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs text-gray-400">
                                            {new Date(f.createdAt).toLocaleDateString('fr-FR')}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(f)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => setDeleteTarget(f._id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Modifier */}
            {editTarget && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Modifier le feedback</h2>
                            <button onClick={() => setEditTarget(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                                <div className="flex gap-2">
                                    {[1,2,3,4,5].map(n => (
                                        <button key={n} type="button" onClick={() => setForm({...form, note: n})}
                                            className={`w-10 h-10 rounded-xl text-sm font-bold transition ${form.note >= n ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Commentaire</label>
                                <textarea value={form.commentaire}
                                    onChange={e => setForm({...form, commentaire: e.target.value})}
                                    rows={4} required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setEditTarget(null)}
                                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                                    Annuler
                                </button>
                                <button type="submit" disabled={formLoading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2">
                                    {formLoading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enregistrement...</> : 'Modifier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={28} className="text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Supprimer ce feedback ?</h3>
                        <p className="text-gray-500 text-sm mb-6">Cette action est irréversible.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                                Annuler
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-medium">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}