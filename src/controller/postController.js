const { getPostsFromDb, getPostsByCatId } = require('../model/postModel');

async function getPosts(req, res) {
  const allPosts = await getPostsFromDb();
  if (allPosts === false) {
    res.status(500);
    return;
  }
  res.json(allPosts);
}

async function postsByCatId(req, res) {
  const { id } = req.params;
  const onePost = await getPostsByCatId(id);
  if (onePost === false) {
    res.status(500);
    return;
  }
  res.json(onePost);
}

module.exports = {
  getPosts,
  postsByCatId,
};
