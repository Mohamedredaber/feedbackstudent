import useCours from '../../hooks/useCours';
import useAuth from '../../hooks/useAuth';
import CoursCard from './Components/CoursCard';
import CoursFilters from './Components/CoursFilters';
import CoursPagination from './Components/CoursPagination';
import CoursModal from './Components/CoursModal';
import DeleteModal from './Components/DeleteModal';
import { Plus, GraduationCap, BookOpen } from 'lucide-react';

export default function Cours() {
  const {
    cours, loading,
    search, setSearch,
    filterCategory, setFilterCategory,
    filterInstructor, setFilterInstructor,
    categories, instructors,
    page, setPage,
    paginated, totalPages,
    showModal, setShowModal,
    form, setForm,
    formError,
    deleteTarget, setDeleteTarget,
    openAdd, openEdit,           // ✅ openAdd vient du hook — pas besoin de useState séparé
    handleSubmit, handleDelete,
    resetFilters,
  } = useCours();

  const { isAdmin, isStudent } = useAuth(); // ✅ isVisitor supprimé — n'existe pas dans useAuth

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
            {cours.length} cours disponibles
          </p>
        </div>

        {/* ✅ Bouton visible seulement pour admin */}
        {isAdmin && (
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-md shadow-blue-200">
            <Plus size={18} /> Ajouter un cours
          </button>
        )}
      </div>

      {/* ── Filtres ── */}
      <CoursFilters
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterInstructor={filterInstructor}
        setFilterInstructor={setFilterInstructor}
        categories={categories}
        instructors={instructors}
        onReset={resetFilters}
      />

      {/* ── Liste ── */}
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(c => (
            <CoursCard
              key={c._id}
              c={c}
              isAdmin={isAdmin}
              isStudent={isStudent}
              onEdit={openEdit}
              onDelete={setDeleteTarget} // ✅ juste setter l'id — handleDelete est dans le hook
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      <CoursPagination page={page} setPage={setPage} totalPages={totalPages} />

      {/* ── Modal Ajouter/Modifier ── */}
      <CoursModal
        show={showModal}
        onClose={() => setShowModal(false)}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        loading={loading}       
        formError={formError}   
      />

      {/* ── Modal Suppression ── */}
      <DeleteModal
        id={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}