const express = require('express');
const {
  getPosts,
  postsByCatId,
  deletePost,
  insertPost,
} = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', insertPost);
postRoutes.get('/posts/category/:id', postsByCatId);
postRoutes.delete('/posts/delete/:id', deletePost);

module.exports = postRoutes;
