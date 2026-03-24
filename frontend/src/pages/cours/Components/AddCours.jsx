import useCours from '../../hooks/useCours';
import useAuth from '../../hooks/useAuth';

import CoursCard from './Components/CoursCard';
import CoursFilters from './Components/CoursFilters';
import CoursPagination from './Components/CoursPagination';
import CoursModal from './Components/CoursModal';
import DeleteModal from './Components/DeleteModal';

export default function Cours() {
  const {
    cours, loading,
    search, setSearch,
    filterCategory, setFilterCategory,
    page, setPage,
    paginated, totalPages,
    showModal, setShowModal,
    form, setForm,
    deleteTarget, setDeleteTarget,
    editCours,
    openAdd, openEdit,
    handleSubmit, handleDelete
  } = useCours();

  const { isAdmin, isStudent, isVisitor } = useAuth();

  const categories = [...new Set(cours.map(c => c.category))];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {isAdmin && (
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Ajouter un cours
        </button>
      )}

      <CoursFilters
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />

      <div className="grid grid-cols-3 gap-4">
        {paginated.map(c => (
          <CoursCard
            key={c._id}
            c={c}
            isAdmin={isAdmin}
            isStudent={isStudent}
            isVisitor={isVisitor}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
          />
        ))}
      </div>

      <CoursPagination page={page} setPage={setPage} totalPages={totalPages} />

      <CoursModal
        show={showModal}
        onClose={() => setShowModal(false)}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <DeleteModal
        id={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}