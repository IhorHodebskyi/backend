const Joi = require("joi");

const sinUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  sinUpSchema,
};
