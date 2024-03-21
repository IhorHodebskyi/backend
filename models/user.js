const Joi = require("joi");

const sinUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const singInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const schemas = {
  sinUpSchema,
  singInSchema,
};

module.exports = schemas;
