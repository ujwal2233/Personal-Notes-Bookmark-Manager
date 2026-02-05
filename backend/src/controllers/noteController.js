const { Note } = require('../models');

/**
 * Create a new note
 * POST /api/notes
 */
const createNote = async (req, res, next) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      isFavorite: isFavorite || false,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all notes for the logged-in user
 * GET /api/notes?q=&tags=
 */
const getNotes = async (req, res, next) => {
  try {
    const { q, tags, favorite } = req.query;
    const query = { userId: req.user._id };

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Filter by favorite
    if (favorite === 'true') {
      query.isFavorite = true;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single note by ID
 * GET /api/notes/:id
 */
const getNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a note
 * PUT /api/notes/:id
 */
const updateNote = async (req, res, next) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    let note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isFavorite !== undefined) note.isFavorite = isFavorite;

    await note.save();

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a note
 * DELETE /api/notes/:id
 */
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
};
