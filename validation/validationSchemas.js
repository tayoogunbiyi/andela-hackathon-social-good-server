const expressJoi = require('express-joi');

const { Joi } = expressJoi;

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

const registrationSchema = {
  ...loginSchema,
  name: Joi.string().required(),
};

const companySchema = {
  name: Joi.string().max(40).required(),
  ticker: Joi.string().max(10).required(),
};

const updateCompanySchema = {
  name: Joi.string().max(40),
  ticker: Joi.string().max(10).required(),
};

const resetPasswordSchema = {
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
};

module.exports = {
  registrationSchema,
  loginSchema,
  companySchema,
  updateCompanySchema,
  resetPasswordSchema,
};
