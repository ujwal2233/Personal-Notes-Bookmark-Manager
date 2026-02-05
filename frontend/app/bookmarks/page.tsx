'use client';

import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Bookmark } from '@/types';
import { bookmarkService } from '@/services';
import {
  Navbar,
  ProtectedRoute,
  BookmarkCard,
  BookmarkForm,
  SearchBar,
  TagFilter,
  Modal,
} from '@/components';
import { FiPlus, FiBookmark } from 'react-icons/fi';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  // Get all unique tags from bookmarks
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    bookmarks.forEach((bookmark) => bookmark.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [bookmarks]);

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      const params: Record<string, string> = {};
      if (searchQuery) params.q = searchQuery;
      if (selectedTags.length > 0) params.tags = selectedTags.join(',');
      if (showFavorites) params.favorite = 'true';

      const data = await bookmarkService.getAll(params);
      setBookmarks(data);
    } catch (error: any) {
      toast.error('Failed to fetch bookmarks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [searchQuery, selectedTags, showFavorites]);

  // Create bookmark
  const handleCreate = async (data: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    isFavorite: boolean;
  }) => {
    try {
      await bookmarkService.create(data);
      toast.success('Bookmark created successfully');
      setIsModalOpen(false);
      fetchBookmarks();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create bookmark';
      toast.error(message);
    }
  };

  // Update bookmark
  const handleUpdate = async (data: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    isFavorite: boolean;
  }) => {
    if (!editingBookmark) return;

    try {
      await bookmarkService.update(editingBookmark._id, data);
      toast.success('Bookmark updated successfully');
      setEditingBookmark(null);
      setIsModalOpen(false);
      fetchBookmarks();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update bookmark';
      toast.error(message);
    }
  };

  // Delete bookmark
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;

    try {
      await bookmarkService.delete(id);
      toast.success('Bookmark deleted successfully');
      fetchBookmarks();
    } catch (error: any) {
      toast.error('Failed to delete bookmark');
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await bookmarkService.update(id, { isFavorite });
      fetchBookmarks();
    } catch (error: any) {
      toast.error('Failed to update bookmark');
    }
  };

  // Open edit modal
  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBookmark(null);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedTags([]);
    setShowFavorites(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
              <p className="text-gray-600 mt-1">
                {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              New Bookmark
            </button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search bookmarks..."
            />
            <TagFilter
              allTags={allTags}
              selectedTags={selectedTags}
              onTagSelect={(tag) => setSelectedTags([...selectedTags, tag])}
              onTagRemove={(tag) => setSelectedTags(selectedTags.filter((t) => t !== tag))}
              onClearAll={handleClearFilters}
              showFavorites={showFavorites}
              onToggleFavorites={() => setShowFavorites(!showFavorites)}
            />
          </div>

          {/* Bookmarks Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <FiBookmark className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No bookmarks found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery || selectedTags.length > 0 || showFavorites
                  ? 'Try adjusting your filters'
                  : 'Get started by creating a new bookmark'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark._id}
                  bookmark={bookmark}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </main>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingBookmark ? 'Edit Bookmark' : 'Create Bookmark'}
        >
          <BookmarkForm
            initialData={
              editingBookmark
                ? {
                    url: editingBookmark.url,
                    title: editingBookmark.title,
                    description: editingBookmark.description,
                    tags: editingBookmark.tags,
                    isFavorite: editingBookmark.isFavorite,
                  }
                : undefined
            }
            onSubmit={editingBookmark ? handleUpdate : handleCreate}
            onCancel={handleCloseModal}
            isEditing={!!editingBookmark}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
