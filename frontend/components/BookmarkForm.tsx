'use client';

import { useState, FormEvent } from 'react';
import { FiX } from 'react-icons/fi';

interface BookmarkFormProps {
  initialData?: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    isFavorite: boolean;
  };
  onSubmit: (data: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    isFavorite: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function BookmarkForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: BookmarkFormProps) {
  const [url, setUrl] = useState(initialData?.url || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [isFavorite, setIsFavorite] = useState(initialData?.isFavorite || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ url, title, description, tags, isFavorite });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          URL *
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
          <span className="text-gray-400 font-normal"> (auto-fetched if empty)</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="Enter bookmark title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field min-h-[100px] resize-y"
          placeholder="Enter bookmark description"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-field flex-1"
            placeholder="Add a tag and press Enter"
          />
          <button type="button" onClick={handleAddTag} className="btn-secondary">
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-primary-900"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="favorite"
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="favorite" className="ml-2 text-sm text-gray-700">
          Mark as favorite
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn-primary flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Bookmark' : 'Create Bookmark'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
