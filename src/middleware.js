const Joi = require('joi');
const jwt = require('jsonwebtoken');

async function validateUser(req, res, next) {
  const schemaLogin = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
  });

  try {
    await schemaLogin.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      errors: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

async function validatePost(req, res, next) {
  const schemaLogin = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    body: Joi.string().min(3).required(),
    category_id: Joi.number().min(1).max(10).required(),
  });

  try {
    await schemaLogin.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      errors: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

function printBody(req, res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('Request body we got:', req.body);
  }
  next();
}

function validateToken(req, res, next) {
  const authHeaders = req.headers.authorization;
  const tokenGotFromUser = authHeaders && authHeaders.split(' ')[1];
  console.log('tokenGotFromUser ===', tokenGotFromUser);
  if (!tokenGotFromUser) return res.status(401).json('token not found');
  jwt.verify(
    tokenGotFromUser,
    process.env.JWT_TOKEN_SECRET,
    (err, tokenPayload) => {
      if (err) return res.status(403).json('token not valid');
      req.username = tokenPayload.username;
      next();
    },
  );
}

module.exports = {
  validateUser,
  printBody,
  validatePost,
  validateToken,
};
