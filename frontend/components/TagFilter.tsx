'use client';

import { FiX, FiStar } from 'react-icons/fi';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export default function TagFilter({
  allTags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearAll,
  showFavorites,
  onToggleFavorites,
}: TagFilterProps) {
  const availableTags = allTags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onToggleFavorites}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            showFavorites
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FiStar className={`mr-1 ${showFavorites ? 'fill-current' : ''}`} />
          Favorites
        </button>

        {availableTags.length > 0 && (
          <select
            onChange={(e) => {
              if (e.target.value) {
                onTagSelect(e.target.value);
                e.target.value = '';
              }
            }}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Filter by tag...</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}

        {(selectedTags.length > 0 || showFavorites) && (
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
            >
              {tag}
              <button
                onClick={() => onTagRemove(tag)}
                className="ml-2 hover:text-primary-900"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
