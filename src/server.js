const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

const users = [
  {
    id: 1,
    username: 'Mike',
    password: 'secret',
  },
  {
    id: 2,
    username: 'James',
    password: 'jam',
  },
];

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  const name = req.params.username;
  const userObjFound = users.find((userObj) => userObj.username === name);
  res.json(userObjFound);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userObjFound = users.find((userObj) => userObj.username === username);
  if (userObjFound && password === userObjFound.password) {
    res.json('Login success');
  } else {
    res.status(400).send('username or password not match');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
