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
    console.log('error ===', error);
    console.log('Klaida validuojant middleware');
    res.status(400).json({
      error: 'Please check inputs',
      errors: error.details.map((dtl) => dtl.message),
    });
  }
}
module.exports = {
  validateUser,
};
