'use client';

import { Note } from '@/types';
import { FiEdit2, FiTrash2, FiStar, FiClock } from 'react-icons/fi';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
}: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="card group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
        <button
          onClick={() => onToggleFavorite(note._id, !note.isFavorite)}
          className={`p-1 rounded-full transition-colors ${
            note.isFavorite
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-300 hover:text-yellow-500'
          }`}
        >
          <FiStar className={note.isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{note.content}</p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-400">
          <FiClock className="mr-1" />
          {formatDate(note.createdAt)}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
