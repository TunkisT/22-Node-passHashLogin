const Joi = require('joi');

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
    body: Joi.string().min(5).required(),
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

module.exports = {
  validateUser,
  printBody,
  validatePost,
};
