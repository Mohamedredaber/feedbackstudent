import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCours, addCours, updateCours, deleteCours,
  selectCours, selectCoursLoading
} from '../features/cours/coursSlice';

const ITEMS_PER_PAGE = 6;
const emptyForm = { title: '', description: '', category: '', instructor: '' };

export default function useCours() {
  const dispatch = useDispatch();
  const cours = useSelector(selectCours);
  const loading = useSelector(selectCoursLoading);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editCours, setEditCours] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');   // ✅ ajouté
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { dispatch(fetchCours()); }, [dispatch]);

  const filtered = cours.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) &&
    (!filterCategory || c.category === filterCategory) &&
    (!filterInstructor || c.instructor === filterInstructor)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const categories = [...new Set(cours.map(c => c.category).filter(Boolean))];
  const instructors = [...new Set(cours.map(c => c.instructor).filter(Boolean))];

  const openAdd = () => { setEditCours(null); setForm(emptyForm); setFormError(''); setShowModal(true); };

  const openEdit = (c) => {
    setEditCours(c);
    setForm({ title: c.title, description: c.description, category: c.category, instructor: c.instructor }); // ✅ pas setForm(c) directement — évite de passer _id etc.
    setFormError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const result = editCours
      ? await dispatch(updateCours({ id: editCours._id, data: form }))
      : await dispatch(addCours(form));

    if (result.meta.requestStatus === 'fulfilled') { // ✅ vérifier le résultat
      setShowModal(false);
    } else {
      setFormError(result.payload || 'Erreur');
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteCours(deleteTarget));
    setDeleteTarget(null);
  };

  const resetFilters = () => {
    setSearch(''); setFilterCategory(''); setFilterInstructor(''); setPage(1);
  };

  return {
    cours, loading,
    search, setSearch,
    filterCategory, setFilterCategory,
    filterInstructor, setFilterInstructor,
    categories, instructors,       // ✅ exposés pour les selects
    page, setPage,
    paginated, totalPages,
    showModal, setShowModal,
    editCours,
    form, setForm,
    formError,                     // ✅ exposé pour le modal
    deleteTarget, setDeleteTarget,
    openAdd, openEdit,
    handleSubmit, handleDelete,
    resetFilters,                  // ✅ exposé
  };
}