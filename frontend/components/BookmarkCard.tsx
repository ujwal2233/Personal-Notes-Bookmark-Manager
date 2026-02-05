'use client';

import { Bookmark } from '@/types';
import { FiEdit2, FiTrash2, FiStar, FiClock, FiExternalLink } from 'react-icons/fi';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

export default function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onToggleFavorite,
}: BookmarkCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="card group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {bookmark.title || getDomain(bookmark.url)}
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mt-1"
          >
            {getDomain(bookmark.url)}
            <FiExternalLink className="ml-1 w-3 h-3" />
          </a>
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark._id, !bookmark.isFavorite)}
          className={`p-1 rounded-full transition-colors ml-2 ${
            bookmark.isFavorite
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-300 hover:text-yellow-500'
          }`}
        >
          <FiStar className={bookmark.isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      {bookmark.description && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{bookmark.description}</p>
      )}

      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {bookmark.tags.map((tag) => (
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
          {formatDate(bookmark.createdAt)}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(bookmark)}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
