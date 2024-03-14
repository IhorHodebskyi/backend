const express = require("express");
const getScore = require("../../controllers/scoreControllers/getScore");
const authenticate = require("../../middlewares/authenticate");

const scoreRouter = express.Router();

scoreRouter.get("/get", authenticate, getScore);

module.exports = scoreRouter;
