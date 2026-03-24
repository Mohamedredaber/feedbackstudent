import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCours, fetchByCategory, fetchByInstructor,
    addCours, updateCours, deleteCours,
    selectCours, selectCoursLoading
} from '../../features/cours/coursSlice';
import useAuth from '../../hooks/useAuth';
import {
    Plus, Pencil, Trash2, Search, BookOpen,
    User, Tag, X, ChevronLeft, ChevronRight,
    MessageSquare, GraduationCap, Filter
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;
const emptyForm = { title: '', description: '', category: '', instructor: '' };

// Couleurs par catégorie
const categoryColors = {
    'Backend':   { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400' },
    'Frontend':  { bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-400' },
    'DevOps':    { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-400' },
    'Database':  { bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-400' },
    'Mobile':    { bg: 'bg-pink-50',   text: 'text-pink-600',   dot: 'bg-pink-400' },
};
const getColor = (cat) => categoryColors[cat] || { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' };

export default function Cours() {
    const dispatch = useDispatch();
    const cours = useSelector(selectCours);
    const loading = useSelector(selectCoursLoading);
    const { isAdmin, isStudent } = useAuth();

    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterInstructor, setFilterInstructor] = useState('');
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [editCours, setEditCours] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => { dispatch(fetchCours()); }, [dispatch]);

    const filtered = cours.filter(c => {
        const matchSearch = c.title?.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCategory ? c.category === filterCategory : true;
        const matchInst = filterInstructor ? c.instructor === filterInstructor : true;
        return matchSearch && matchCat && matchInst;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    const categories = [...new Set(cours.map(c => c.category).filter(Boolean))];
    const instructors = [...new Set(cours.map(c => c.instructor).filter(Boolean))];

    const openAdd = () => { setEditCours(null); setForm(emptyForm); setFormError(''); setShowModal(true); };
    const openEdit = (c) => { setEditCours(c); setForm({ title: c.title, description: c.description, category: c.category, instructor: c.instructor }); setFormError(''); setShowModal(true); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);
        const result = editCours
            ? await dispatch(updateCours({ id: editCours._id, data: form }))
            : await dispatch(addCours(form));
        setFormLoading(false);
        if (result.meta.requestStatus === 'fulfilled') setShowModal(false);
        else setFormError(result.payload || 'Erreur');
    };

    const handleDelete = async () => {
        await dispatch(deleteCours(deleteTarget));
        setDeleteTarget(null);
    };

    const resetFilters = () => {
        setSearch(''); setFilterCategory(''); setFilterInstructor(''); setPage(1);
        dispatch(fetchCours());
    };

    const hasFilters = search || filterCategory || filterInstructor;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <GraduationCap size={22} className="text-blue-600" />
                        </div>
                        Catalogue des cours
                    </h1>
                    <p className="text-gray-500 mt-1 ml-[52px]">
                        {filtered.length} cours disponibles
                    </p>
                </div>
                {isAdmin && (
                    <button onClick={openAdd}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-md shadow-blue-200">
                        <Plus size={18} /> Ajouter un cours
                    </button>
                )}
            </div>

            {/* ── Filtres ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
                    <Filter size={15} /> Filtres
                </div>
                <div className="flex flex-wrap gap-3 items-end">

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Recherche</label>
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                placeholder="Rechercher un cours..."
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                            />
                        </div>
                    </div>

                    <div className="min-w-[180px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Catégorie</label>
                        <div className="relative">
                            <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select value={filterCategory}
                                onChange={e => { setFilterCategory(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                                <option value="">Toutes les catégories</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="min-w-[180px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Instructeur</label>
                        <div className="relative">
                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select value={filterInstructor}
                                onChange={e => { setFilterInstructor(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                                <option value="">Tous les instructeurs</option>
                                {instructors.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                            </select>
                        </div>
                    </div>

                    {hasFilters && (
                        <button onClick={resetFilters}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition px-4 py-2.5 rounded-xl hover:bg-red-50 border border-gray-200">
                            <X size={15} /> Réinitialiser
                        </button>
                    )}
                </div>
            </div>

            {/* ── Contenu ── */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Chargement des cours...</p>
                </div>
            ) : paginated.length === 0 ? (
                <div className="text-center py-24">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Aucun cours trouvé</p>
                    <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres</p>
                    {hasFilters && (
                        <button onClick={resetFilters}
                            className="mt-4 text-blue-600 text-sm hover:underline">
                            Réinitialiser les filtres
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((c) => {
                        const color = getColor(c.category);
                        return (
                            <div key={c._id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group">

                                {/* Card top color bar */}
                                <div className={`h-1.5 w-full ${color.dot}`} />

                                <div className="p-6 flex flex-col flex-1">

                                    {/* Badge + Actions admin */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color.bg} ${color.text}`}>
                                            {c.category}
                                        </span>
                                        {isAdmin && (
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(c)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => setDeleteTarget(c._id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Titre */}
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
                                        {c.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                                        {c.description}
                                    </p>

                                    {/* Footer card */}
                                    <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <User size={13} className="text-indigo-600" />
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">{c.instructor}</span>
                                        </div>

                                        {/* Bouton feedback — student seulement */}
                                        {isStudent && (
                                            <button
                                                onClick={() => {/* navigate vers feedback */ }}
                                                className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 px-3 py-1.5 rounded-lg transition">
                                                <MessageSquare size={13} />
                                                Feedback
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition">
                        <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => setPage(i + 1)}
                            className={`w-9 h-9 rounded-xl text-sm font-medium transition ${page === i + 1
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'border border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition">
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            {/* ── Modal Ajouter/Modifier ── */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editCours ? '✏️ Modifier le cours' : '➕ Ajouter un cours'}
                            </h2>
                            <button onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition">
                                <X size={18} />
                            </button>
                        </div>

                        {formError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { name: 'title', label: 'Titre', placeholder: 'ex: React Avancé', disabled: !!editCours },
                                { name: 'description', label: 'Description', placeholder: 'Description du cours...' },
                                { name: 'category', label: 'Catégorie', placeholder: 'ex: Backend' },
                                { name: 'instructor', label: 'Instructeur', placeholder: 'ex: Prof Martin' },
                            ].map(field => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                    <input
                                        type="text"
                                        value={form[field.name]}
                                        onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                                        placeholder={field.placeholder}
                                        required
                                        disabled={field.disabled}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    />
                                </div>
                            ))}

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                                    Annuler
                                </button>
                                <button type="submit" disabled={formLoading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-60 flex items-center justify-center gap-2">
                                    {formLoading
                                        ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enregistrement...</>
                                        : editCours ? 'Modifier' : 'Ajouter'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Modal Suppression ── */}
            {deleteTarget && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={28} className="text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Supprimer ce cours ?</h3>
                        <p className="text-gray-500 text-sm mb-6">Cette action est irréversible.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                                Annuler
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-medium transition">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}