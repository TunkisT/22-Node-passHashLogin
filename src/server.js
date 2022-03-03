const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

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
  // if (bcrypt.compareSync(password, userObjFound.password)) {
  //   console.log('sutampa');
  // }
  if (bcrypt.compareSync(password, userObjFound.password) && userObjFound) {
    res.json('Login success');
  } else {
    res.status(400).send('username or password not match');
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const passHash = bcrypt.hashSync(password, 10);

  console.log('passHash ===', passHash);

  const newUser = {
    username,
    password: passHash,
  };
  users.push(newUser);
  res.send(passHash);
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  town: Joi.string().min(4).max(30).pattern(new RegExp('[a-zA-Z]')).required(),
  age: Joi.number().min(18).max(200).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

app.post('/validate', (req, res) => {
  const userData = req.body;
  try {
    userData = schema.validateAsync(userData);
    res.json(userData);
    return;
  } catch (error) {
    console.log(error);
    res.send(error, 'Incorect data');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
