const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const ctrl = require("../../controllers/gameResults");

const scoreRouter = express.Router();

scoreRouter.get("/get", authenticate, ctrl.getScore);

scoreRouter.post("/update", authenticate, ctrl.update);

module.exports = scoreRouter;
