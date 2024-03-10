const express = require("express");
const { getAllUser, signUp } = require("../../controllers/signUp");
const validateBody = require("../../middlewares/validateBody");
const { sinUpSchema } = require("../../schemas/usersSchemas");
const authenticate = require("../../middlewares/authenticate");
const { singIn } = require("../../controllers/singIn");
const router = express.Router();

router.get("/api", authenticate, getAllUser);

router.post("/signup", validateBody(sinUpSchema), signUp);

router.post("/singin", singIn);

module.exports = router;
