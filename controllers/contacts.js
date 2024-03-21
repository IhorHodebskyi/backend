const { ctrlWrapper } = require("../helpers");
const services = require("../services/contactsServices");

const getContacts = async (req, res) => {
  const { id } = req.user;
  const result = await services.getContacts(id);
  res.json(result);
};

const addContacts = async (req, res) => {
  const { id: user_id } = req.user;
  const { name, phone } = req.body;
  const result = await services.addContacts(user_id, name, phone);
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  addContacts: ctrlWrapper(addContacts),
};
