const {
  getPostsFromDb,
  getPostsByCatId,
  deletePostById,
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

module.exports = {
  getPosts,
  postsByCatId,
  deletePost,
};
