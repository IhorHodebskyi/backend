const { ctrlWrapper } = require("../helpers");
const services = require("../services/contactsServices");

const getContacts = async (req, res) => {
  const { id: user_id } = req.user;
  const result = await services.getContacts(user_id);
  res.json(result);
};

const addContacts = async (req, res) => {
  const { id: user_id } = req.user;
  const { name, number } = req.body;
  const result = await services.addContacts(user_id, name, number);
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await services.deleteContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  addContacts: ctrlWrapper(addContacts),
  deleteContact: ctrlWrapper(addContacts),
};
