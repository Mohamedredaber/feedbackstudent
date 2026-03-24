import { X } from 'lucide-react';

export default function CoursModal({ show, onClose, form, setForm, onSubmit, loading }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {form._id ? '✏️ Modifier le cours' : '➕ Nouveau cours'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {[
            { name: 'title',       label: 'Titre',        placeholder: 'ex: React Avancé',      disabled: !!form._id },
            { name: 'description', label: 'Description',  placeholder: 'Description du cours...' },
            { name: 'category',    label: 'Catégorie',    placeholder: 'ex: Backend' },
            { name: 'instructor',  label: 'Instructeur',  placeholder: 'ex: Prof Martin' },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {field.label}
              </label>
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
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enregistrement...</>
                : form._id ? 'Modifier' : 'Enregistrer'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}