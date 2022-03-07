const { getCategoriesFromDb } = require('../model/categories');

async function getCategories(req, res) {
  const allCategories = await getCategoriesFromDb();
  if (allCategories === false) {
    res.status(500);
    return;
  }
  res.json(allCategories);
}

module.exports = {
  getCategories,
};
