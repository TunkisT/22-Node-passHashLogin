const express = require('express');
const { getPosts, postsByCatId } = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.get('/posts/category/:id', postsByCatId);

module.exports = postRoutes;
