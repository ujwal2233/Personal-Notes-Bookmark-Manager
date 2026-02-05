const { Bookmark } = require('../models');
const { fetchPageTitle } = require('../utils');

/**
 * Create a new bookmark
 * POST /api/bookmarks
 */
const createBookmark = async (req, res, next) => {
  try {
    let { url, title, description, tags, isFavorite } = req.body;

    // Auto-fetch page title if not provided
    if (!title || title.trim() === '') {
      const fetchedTitle = await fetchPageTitle(url);
      title = fetchedTitle || url;
    }

    const bookmark = await Bookmark.create({
      url,
      title,
      description: description || '',
      tags: tags || [],
      isFavorite: isFavorite || false,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Bookmark created successfully',
      data: bookmark
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all bookmarks for the logged-in user
 * GET /api/bookmarks?q=&tags=
 */
const getBookmarks = async (req, res, next) => {
  try {
    const { q, tags, favorite } = req.query;
    const query = { userId: req.user._id };

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
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

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single bookmark by ID
 * GET /api/bookmarks/:id
 */
const getBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a bookmark
 * PUT /api/bookmarks/:id
 */
const updateBookmark = async (req, res, next) => {
  try {
    const { url, title, description, tags, isFavorite } = req.body;

    let bookmark = await Bookmark.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    // Update fields
    if (url !== undefined) bookmark.url = url;
    if (title !== undefined) bookmark.title = title;
    if (description !== undefined) bookmark.description = description;
    if (tags !== undefined) bookmark.tags = tags;
    if (isFavorite !== undefined) bookmark.isFavorite = isFavorite;

    await bookmark.save();

    res.status(200).json({
      success: true,
      message: 'Bookmark updated successfully',
      data: bookmark
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a bookmark
 * DELETE /api/bookmarks/:id
 */
const deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bookmark deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark
};
