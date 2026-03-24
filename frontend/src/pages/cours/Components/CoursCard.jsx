import { Pencil, Trash2, MessageSquare } from 'lucide-react';
import { getColor } from '../../../utils/coursUtils';

export default function CoursCard({ c, isAdmin, isStudent ,isVisitor, onEdit, onDelete }) {
  const color = getColor(c.category);

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className={`h-1.5 ${color.dot}`} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between mb-3">
          <span className={`text-xs px-2 py-1 rounded ${color.bg} ${color.text}`}>
            {c.category}
          </span>

          {isAdmin && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(c)}>
                <Pencil size={14} />
              </button>
              <button onClick={() => onDelete(c._id)}>
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        <h3 className="font-bold">{c.title}</h3>
        <p className="text-sm text-gray-500 flex-1">{c.description}</p>

        <div className="flex justify-between mt-4">
          <span className="text-sm">{c.instructor}</span>

          {isStudent && (
            <button className="text-blue-600 text-xs flex items-center gap-1">
              <MessageSquare size={12} /> Feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
}