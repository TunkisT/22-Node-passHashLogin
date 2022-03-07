const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getCategoriesFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM categories
    `;
    const [result] = await connection.query(sql);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getPostsFromDb error ===', error);
  }
}

module.exports = {
  getCategoriesFromDb,
};
