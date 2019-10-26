const expressJoi = require('express-joi');

const { Joi } = expressJoi;

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

const registrationSchema = {
  ...loginSchema,
  phone: Joi.string().required(),
  accountType: Joi.string().required(),
  name: Joi.string(),
  accountNumber: Joi.string(),
};


module.exports = {
  registrationSchema,
  loginSchema,
};
