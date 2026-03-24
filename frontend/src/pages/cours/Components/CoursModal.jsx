export default function CoursModal({ show, onClose, form, setForm, onSubmit }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded w-96 space-y-3">
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Titre"
          className="w-full border p-2"
        />
        <input
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full border p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}