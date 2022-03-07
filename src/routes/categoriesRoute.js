const express = require('express');
const { getCategories } = require('../controller/categoriesController');

const postCategories = express.Router();

postCategories.get('/categories', getCategories);

module.exports = postCategories;
