const {
  getPostsFromDb,
  getPostsByCatId,
  deletePostById,
  addPostToDb,
} = require('../model/postModel');

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

async function deletePost(req, res) {
  const { id } = req.params;
  const onePost = await deletePostById(id);
  if (onePost === false) {
    res.status(500);
    return;
  }
  if (onePost.affectedRows !== 1) {
    res.json('No cars deleted');
  }
  res.json('Delete successful');
}

async function insertPost(req, res) {
  const body = req.body;
  const onePost = await addPostToDb(body);
  if (onePost === false) {
    res.status(500);
    return;
  }
  if (onePost.affectedRows !== 1) {
    res.json('No add problem');
  }
  res.json('You added new post!');
}

module.exports = {
  getPosts,
  postsByCatId,
  deletePost,
  insertPost,
};
