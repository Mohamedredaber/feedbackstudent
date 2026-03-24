export default function CoursFilters({
  search, setSearch,
  filterCategory, setFilterCategory,
  categories
}) {
  return (
    <div className="mb-6 flex gap-4">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Recherche..."
        className="border p-2 rounded"
      />

      <select
        value={filterCategory}
        onChange={e => setFilterCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Catégories</option>
        {categories.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}