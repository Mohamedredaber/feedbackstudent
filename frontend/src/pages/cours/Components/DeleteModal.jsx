export default function DeleteModal({ id, onCancel, onConfirm }) {
  if (!id) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded text-center">
        <p>Supprimer ?</p>
        <div className="flex gap-3 mt-4">
          <button onClick={onCancel}>Annuler</button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}