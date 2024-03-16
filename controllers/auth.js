const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const signUp = async (req, res) => {
  const { body } = req;
  const result = await services.signUp(body);
  res.status(201).json(result);
};

const singIn = async (req, res) => {
  const { email, password } = req.body;
  const result = await services.singIn(email, password);
  res.status(200).json(result);
};

const logout = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  await services.logout(id);
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  singIn: ctrlWrapper(singIn),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
