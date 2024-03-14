const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const signup = async (req, res) => {
  const { body } = req;
  const result = await services.signup(body);
  res.status(201).json(result);
};

module.exports = {
  signup: ctrlWrapper(signup),
};
