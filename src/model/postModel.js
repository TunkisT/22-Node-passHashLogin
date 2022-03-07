const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getPostsFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT posts.post_id, posts.title, posts.body, categories.name AS 'category'
    FROM posts
    LEFT JOIN categories
    ON posts.category_id = categories.category_id
    `;

    const [result] = await connection.query(sql);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getPostsFromDb error ===', error);
  }
}

async function getPostsByCatId(categoryId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('categoryId ===', categoryId);
    const sql = `
      SELECT posts.post_id, posts.title, posts.body, categories.name AS 'category'
      FROM posts
      LEFT JOIN categories
      ON posts.category_id = categories.category_id
      WHERE posts.category_id = ?
      `;

    const [result] = await connection.query(sql, categoryId);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getPostsByCatFromDb =', error);
  }
}

module.exports = {
  getPostsFromDb,
  getPostsByCatId,
};
