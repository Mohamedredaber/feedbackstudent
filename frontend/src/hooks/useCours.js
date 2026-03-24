import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCours,
  addCours,
  updateCours,
  deleteCours,
  selectCours,
  selectCoursLoading
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
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchCours());
  }, [dispatch]);

  const filtered = cours.filter(c => {
    return (
      c.title?.toLowerCase().includes(search.toLowerCase()) &&
      (!filterCategory || c.category === filterCategory) &&
      (!filterInstructor || c.instructor === filterInstructor)
    );
  });

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const openAdd = () => {
    setEditCours(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditCours(c);
    setForm(c);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editCours) {
      await dispatch(updateCours({ id: editCours._id, data: form }));
    } else {
      await dispatch(addCours(form));
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteCours(deleteTarget));
    setDeleteTarget(null);
  };

  return {
    cours,
    loading,
    search, setSearch,
    filterCategory, setFilterCategory,
    filterInstructor, setFilterInstructor,
    page, setPage,
    paginated,
    totalPages,
    showModal, setShowModal,
    editCours,
    form, setForm,
    deleteTarget, setDeleteTarget,
    openAdd, openEdit,
    handleSubmit,
    handleDelete
  };
}