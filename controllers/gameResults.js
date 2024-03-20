const { ctrlWrapper } = require("../helpers");
const services = require("../services/services");

const getScore = async (req, res) => {
  const { id } = req.user;
  const result = await services.getScore(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.user;
  const { victory, defeat, draw } = req.body;
  const result = await services.update(id, victory, defeat, draw);
  res.json(result);
};

module.exports = {
  getScore: ctrlWrapper(getScore),
  update: ctrlWrapper(update),
};
