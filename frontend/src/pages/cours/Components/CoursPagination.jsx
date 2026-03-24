export default function CoursPagination({ page, setPage, totalPages }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}