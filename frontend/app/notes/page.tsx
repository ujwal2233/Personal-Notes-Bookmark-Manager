'use client';

import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Note } from '@/types';
import { noteService } from '@/services';
import {
  Navbar,
  ProtectedRoute,
  NoteCard,
  NoteForm,
  SearchBar,
  TagFilter,
  Modal,
} from '@/components';
import { FiPlus, FiFileText } from 'react-icons/fi';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Get all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [notes]);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const params: Record<string, string> = {};
      if (searchQuery) params.q = searchQuery;
      if (selectedTags.length > 0) params.tags = selectedTags.join(',');
      if (showFavorites) params.favorite = 'true';

      const data = await noteService.getAll(params);
      setNotes(data);
    } catch (error: any) {
      toast.error('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [searchQuery, selectedTags, showFavorites]);

  // Create note
  const handleCreate = async (data: {
    title: string;
    content: string;
    tags: string[];
    isFavorite: boolean;
  }) => {
    try {
      await noteService.create(data);
      toast.success('Note created successfully');
      setIsModalOpen(false);
      fetchNotes();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create note';
      toast.error(message);
    }
  };

  // Update note
  const handleUpdate = async (data: {
    title: string;
    content: string;
    tags: string[];
    isFavorite: boolean;
  }) => {
    if (!editingNote) return;

    try {
      await noteService.update(editingNote._id, data);
      toast.success('Note updated successfully');
      setEditingNote(null);
      setIsModalOpen(false);
      fetchNotes();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update note';
      toast.error(message);
    }
  };

  // Delete note
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await noteService.delete(id);
      toast.success('Note deleted successfully');
      fetchNotes();
    } catch (error: any) {
      toast.error('Failed to delete note');
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await noteService.update(id, { isFavorite });
      fetchNotes();
    } catch (error: any) {
      toast.error('Failed to update note');
    }
  };

  // Open edit modal
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
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
              <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              <p className="text-gray-600 mt-1">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              New Note
            </button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search notes..."
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

          {/* Notes Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No notes found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery || selectedTags.length > 0 || showFavorites
                  ? 'Try adjusting your filters'
                  : 'Get started by creating a new note'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
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
          title={editingNote ? 'Edit Note' : 'Create Note'}
        >
          <NoteForm
            initialData={
              editingNote
                ? {
                    title: editingNote.title,
                    content: editingNote.content,
                    tags: editingNote.tags,
                    isFavorite: editingNote.isFavorite,
                  }
                : undefined
            }
            onSubmit={editingNote ? handleUpdate : handleCreate}
            onCancel={handleCloseModal}
            isEditing={!!editingNote}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
