const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  incrementViewCount,
  addComment,
  searchPosts,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPostById);
router.put('/view/:id', incrementViewCount);

// Protected routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, addComment);

module.exports = router;