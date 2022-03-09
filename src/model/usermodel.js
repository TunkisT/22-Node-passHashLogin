const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserDb(newUserData) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO users (username, password) VALUES(?, ?)`;

    const [insertResult] = await connection.execute(sql, [
      newUserData.username,
      newUserData.password,
    ]);
    await connection.close();
    return insertResult;
  } catch (error) {
    console.log('addUserDb', error);
    return false;
  }
}

async function findUserByUsername(username) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM users WHERE username = ?`;

    const [userFound] = await connection.query(sql, [username]);
    await connection.close();

    return userFound;
  } catch (error) {
    console.log('findUserByUsername', error);
    return false;
  }
}

module.exports = {
  addUserDb,
  findUserByUsername,
};
