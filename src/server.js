const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { printBody, validateUser } = require('./middleware');
const { addUserDb, findUserByUsername } = require('./model/usermodel');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;
const jwtSecret = process.env.JWT_TOKEN_SECRET;

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
app.use(printBody);

const postRoutes = require('./routes/postRoutes');
const CategoriesRoutes = require('./routes/categoriesRoute');

app.use('/', postRoutes);
app.use('/', CategoriesRoutes);

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  const name = req.params.username;
  const userObjFound = users.find((userObj) => userObj.username === name);
  res.json(userObjFound);
});

app.post('/login', validateUser, async (req, res) => {
  const { username, password } = req.body;

  const [userObjFound] = await findUserByUsername(username);

  console.log('userObjFound ===', [userObjFound]);

  if (bcrypt.compareSync(password, userObjFound.password) && userObjFound) {
    const loggedInUserObj = { username };
    const token = jwt.sign(loggedInUserObj, jwtSecret, { expiresIn: '1h' });
    console.log('token ===', token);
    res.json({
      success: true,
      msg: `Login successful. Hello ${username}`,
      token,
    });
  } else {
    res.status(400).json({
      success: false,
      errors: {
        message: 'password or username do not match',
      },
    });
  }
});

app.post('/register', validateUser, async (req, res) => {
  const { username, password } = req.body;
  const passHash = bcrypt.hashSync(password, 10);

  const newUser = {
    username,
    password: passHash,
  };
  const addResult = await await addUserDb(newUser);
  if (addResult === false) {
    const respond = {
      success: false,
      errors: {
        message: 'Something went wrong',
      },
    };
    res.status(500).json(respond);
    return;
  }
  res.json({
    success: true,
    msg: 'User registered',
  });
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  town: Joi.string().min(4).max(30).pattern(new RegExp('[a-zA-Z]$')).required(),
  age: Joi.number().min(18).max(200).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

app.post('/validate', async (req, res) => {
  const userData = req.body;

  try {
    await schema.validateAsync(userData, { abortEarly: false });
  } catch (error) {
    console.log('error ===', error);
    console.log('Klaida validuojant');
    res.status(400).json({
      error: 'Please check inputs',
      errors: error.details.map((dtl) => dtl.message),
    });
    return;
  }

  res.json(userData);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// susigeneruot random password
// node -> require('crypto').randomBytes(64).toString('hex')
