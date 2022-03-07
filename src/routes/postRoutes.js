const express = require('express');
const {
  getPosts,
  postsByCatId,
  deletePost,
} = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.get('/posts/category/:id', postsByCatId);
postRoutes.delete('/posts/delete/:id', deletePost);

module.exports = postRoutes;
