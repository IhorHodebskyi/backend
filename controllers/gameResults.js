const { ctrlWrapper } = require("../helpers");
const services = require("../services/services");

const getScore = async (req, res) => {
  const result = await services.getScore();
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.user;

  const { score } = req.body;
  console.log(req.body);
  const result = await services.update(id, score);
  res.json(result);
};

module.exports = {
  getScore: ctrlWrapper(getScore),
  update: ctrlWrapper(update),
};
