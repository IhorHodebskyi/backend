const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const schemas = {
  addSchema,
};

module.exports = schemas;
